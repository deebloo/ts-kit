import { Injector, ClassProviderToken } from '@ts-kit/di';
import { TemplateResult, render, html } from 'lit-html';

import { ComponentState } from './state';
import { ELEMENT_REF } from './el-ref';

type TemplateDef<T> = (
  state: T,
  run: (event: string, ...args: unknown[]) => (e: Event) => void
) => TemplateResult;

export interface ComponentConfig<T> {
  tag: string;
  template: TemplateDef<T>;
  defaultState?: T;
  style?: TemplateResult;
}

export interface OnPropChanges {
  onPropChanges: (prop: string, value: any) => void;
}

export interface OnInit {
  onInit: () => void;
}

export type ComponentInstance = {
  props: string[];
  handlers: { [key: string]: Function };
  [key: string]: any;
} & Partial<OnPropChanges> &
  Partial<OnInit>;

export type ElementInstance<T> = {
  componentInjector: Injector;
  componentInstance: ComponentInstance;
  componentState: ComponentState<T>;
} & HTMLElement & { [key: string]: any };

export type ComponentDef<T> = ClassProviderToken<T> & { tag?: string };

export const ElementInstance = <T>(element: HTMLElement) => (element as any) as ElementInstance<T>;

export const createComponent = <S, C>(
  componentDef: ClassProviderToken<C> & { [key: string]: any }
) => {
  return ElementInstance<S>(document.createElement(componentDef.tag));
};

export const Component = <T = any>(config: ComponentConfig<T>) => (
  componentDef: ComponentDef<any>
) => {
  componentDef.tag = config.tag;

  customElements.define(
    config.tag,
    class extends HTMLElement implements ElementInstance<T> {
      public componentInstance: ComponentInstance;
      public componentState: ComponentState<T>;
      public componentInjector = new Injector(
        {
          providers: [
            { provide: ELEMENT_REF, useFactory: () => this },
            {
              provide: ComponentState,
              useFactory: () => {
                return new ComponentState<T>(
                  state =>
                    render(
                      html`
                        ${config.style} ${config.template(state, this.run)}
                      `,
                      this.shadow
                    ),
                  config.defaultState as T
                );
              }
            }
          ]
        },
        window.ROOT__INJECTOR__ // The root injector is global
      );

      private shadow = this.attachShadow({ mode: 'open' });
      private run = (eventName: string, payload: unknown) => (e: Event) => {
        if (eventName in this.componentInstance.handlers) {
          this.componentInstance.handlers[eventName].call(this.componentInstance, e, payload);
        }
      };

      constructor() {
        super();

        render(
          html`
            ${config.style} ${config.template(config.defaultState as T, this.run)}
          `,
          this.shadow
        );

        this.componentInstance = this.componentInjector.create(componentDef);

        this.componentInstance.props = this.componentInstance.props || [];

        this.componentState = this.componentInjector.get(ComponentState);

        for (let i = 0; i < this.componentInstance.props.length; i++) {
          const prop = this.componentInstance.props[i];

          Object.defineProperty(this, prop, {
            set: value => {
              this.componentInstance[prop] = value;

              if (this.componentInstance.onPropChanges) {
                this.componentInstance.onPropChanges(prop, value);
              }
            },
            get: () => this.componentInstance[prop]
          });
        }

        if (this.componentInstance.onInit) {
          this.componentInstance.onInit();
        }
      }
    }
  );
};

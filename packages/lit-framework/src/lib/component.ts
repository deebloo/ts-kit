import { Injector, ClassProviderToken } from '@ts-kit/di';
import { TemplateResult, render } from 'lit-html';

import { ComponentState } from './state';
import { ELEMENT_REF } from './el-ref';

export interface ComponentConfig<T> {
  tag: string;
  defaultState?: T;
  template: (
    state: T,
    run: (event: string, ...args: unknown[]) => (e: Event) => void
  ) => TemplateResult;
}

export interface OnPropChanges {
  onPropChanges: (prop: string, value: any) => void;
}

export type ComponentInstance = {
  props: string[];
  handlers: { [key: string]: Function };
  [key: string]: any;
} & Partial<OnPropChanges>;

interface ElementComponent<T> {
  componentInjector: Injector;
  componentInstance: ComponentInstance;
  componentState: ComponentState<T>;
}

export const Component = <T = any>(config: ComponentConfig<T>) => (
  componentDef: ClassProviderToken<any>
) => {
  customElements.define(
    config.tag,
    class extends HTMLElement implements ElementComponent<T> {
      private shadow = this.attachShadow({ mode: 'open' });

      private run = (eventName: string, payload: any) => (e: Event) => {
        if (eventName in this.componentInstance.handlers) {
          this.componentInstance.handlers[eventName].call(this.componentInstance, e, payload);
        }
      };

      public componentInjector: Injector = new Injector(
        {
          providers: [
            { provide: ELEMENT_REF, useFactory: () => this },
            {
              provide: ComponentState,
              useFactory: () => {
                return new ComponentState<T>(
                  state => render(config.template(state, this.run), this.shadow),
                  config.defaultState as T
                );
              }
            }
          ]
        },
        window.ROOT__INJECTOR__ // The root injector is global
      );

      public componentInstance: ComponentInstance;
      public componentState: ComponentState<T>;

      constructor() {
        super();

        render(config.template(config.defaultState as T, this.run), this.shadow);

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
      }
    }
  );
};

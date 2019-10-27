import { Injector, ClassProviderToken } from '@ts-kit/di';
import { TemplateResult, render } from 'lit-html';

import { ComponentState } from './state';
import { ELEMENT_REF } from './el-ref';

export interface ComponentConfig<T> {
  tag: string;
  template: (state: T, run: (event: string, payload?: any) => (e: Event) => void) => TemplateResult;
}

export type ComponentDef<T> = ClassProviderToken<T>;

export interface ComponentInstance {
  props: string[];
  actions: { [key: string]: Function };
  handlers: { [key: string]: Function };
  [key: string]: any;
}

export interface OnPropChanges {
  onPropChanges: (prop: string) => void;
}

export function Component<T>(config: ComponentConfig<T>) {
  return function(componentDef: ComponentDef<any>) {
    customElements.define(
      config.tag,
      class extends HTMLElement {
        constructor() {
          super();

          const shadow = this.attachShadow({ mode: 'open' });

          const actionHandler = (eventName: string, payload: any) => (e: Event) => {
            if (eventName in instance.actions) {
              instance.actions[eventName].call(instance, e, payload);
            }
          };

          const injector = new Injector(
            {
              providers: [
                {
                  provide: ComponentState,
                  useFactory: () =>
                    new ComponentState((state: any) =>
                      render(config.template(state, actionHandler), shadow)
                    )
                },
                {
                  provide: ELEMENT_REF,
                  useFactory: () => this
                }
              ]
            },
            window.ROOT__INJECTOR__
          );

          const instance: ComponentInstance = injector.create(componentDef);

          instance.props = instance.props || [];

          render(config.template(undefined as any, actionHandler), shadow);

          for (let i = 0; i < instance.props.length; i++) {
            const prop = instance.props[i];

            Object.defineProperty(this, prop, {
              set(value) {
                instance[prop] = value;

                if ('onPropChanges' in instance) {
                  instance.onPropChanges(prop, value);
                }
              }
            });
          }
        }
      }
    );
  };
}

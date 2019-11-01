import { Injector } from '@ts-kit/di';

declare global {
  interface Window {
    ROOT__INJECTOR__: Injector;
  }
}

export { bootstrapApplication, html } from './lib/app';
export {
  ComponentConfig,
  OnPropChanges,
  OnInit,
  ComponentInstance,
  ElementInstance,
  Component,
  createComponent
} from './lib/component';
export { State, AppState, ComponentState } from './lib/state';
export { Prop } from './lib/prop';
export { ElRef } from './lib/el-ref';
export { Handle } from './lib/handle';

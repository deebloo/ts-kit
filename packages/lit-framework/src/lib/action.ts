import { ComponentInstance } from './component';

export function Action(action: string) {
  return function(instance: any, key: string) {
    const i = instance as ComponentInstance;

    i.actions = i.actions || {};

    i.actions[action] = i[key];
  };
}

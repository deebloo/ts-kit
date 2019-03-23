import { Provider } from './provider';

export function Inject(key: Provider<any>) {
  return function(provider: Provider<any>, _prop: string, _index: number) {
    if (!provider.deps) {
      provider.deps = [];
    }

    if (provider.deps.indexOf(key) <= -1) {
      provider.deps.push(key);
    }
  };
}

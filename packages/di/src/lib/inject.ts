import { Provider } from './provider';

export function Inject(injectable: Provider<any>) {
  return function(provider: Provider<any>, _prop: string, index: number) {
    if (!provider.deps) {
      provider.deps = [];
    }

    if (provider.deps[index] === undefined) {
      provider.deps[index] = injectable;
    }
  };
}

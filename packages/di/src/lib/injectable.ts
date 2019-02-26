import { Provider } from './provider';

export interface InjectableConfig {
  deps?: Provider<any>[];
}

export function Injectable(config: InjectableConfig = { deps: [] }) {
  return function(provider: Provider<any>) {
    if (!provider.deps) {
      provider.deps = config.deps;
    }
  };
}

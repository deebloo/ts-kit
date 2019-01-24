import { Provider } from './provider';
export interface InjectableConfig {
    deps?: Provider<any>[];
}
export declare function Injectable(config?: InjectableConfig): (provider: Provider<any>) => void;

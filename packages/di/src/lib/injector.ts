import { Provider, OverrideProvider, ClassProvider, FactoryOverrideProvider } from './provider';

export interface InjectorOptions {
  providers?: OverrideProvider<any>[];
  bootstrap?: Provider<any>[];
}

/**
 * Create an instance of a Dependency injector.
 * Can be used to create a singleton of any class that is property annotated with dependencies.
 *
 * @param opts configuration options for the current instance of Injector
 * @param parent a parent instance of Injector
 */
export class Injector {
  private providerMap = new WeakMap<Provider<any>, any>();

  constructor(private opts: InjectorOptions = { providers: [] }, private parent?: Injector) {
    if (this.opts.bootstrap) {
      this.opts.bootstrap.forEach(provider => this.get(provider));
    }
  }

  /**
   * recursively check if a singleton instance is available for a provider
   *
   */
  has(provider: Provider<any>): boolean {
    if (!this.parent) {
      return this.providerMap.has(provider);
    } else {
      return this.parent.has(provider);
    }
  }

  /**
   * fetches a singleton instance of a provider
   */
  get<T>(provider: Provider<T>): T {
    if (this.providerMap.has(provider)) {
      // if provider has already been created in this scope return it
      return this.providerMap.get(provider);
    } else {
      const override = this.findOverride(provider);

      if (override !== null) {
        // if an override is available for this Injector use that
        return this.createSingletonFromOverride(override);
      } else if (this.parent && this.parent.has(provider)) {
        // if a parent is available and contains an instance of the provider already use that
        return this.parent.get(provider);
      }
    }

    return this.createSingletonFromClass(<ClassProvider<T>>provider);
  }

  /**
   * Create a new instance of a provider
   */
  create<T>(P: ClassProvider<T>): T {
    return P.deps ? new P(...P.deps.map(dep => this.get(dep))) : new P();
  }

  private createSingletonFromOverride<T>(provider: OverrideProvider<T>): T | null {
    if ('useClass' in provider) {
      return this.createSingletonFromClass(provider.useClass);
    } else if ('useFactory' in provider) {
      return this.createSingletonFromFactory(provider);
    }

    return null;
  }

  private createSingletonFromClass<T>(P: ClassProvider<T>): T {
    const instance = P.deps ? new P(...P.deps.map(dep => this.get(dep))) : new P();

    this.providerMap.set(P, instance);

    return instance;
  }

  private createSingletonFromFactory<T>(provider: FactoryOverrideProvider<T>) {
    const instance = provider.deps
      ? provider.useFactory(...provider.deps.map(dep => this.get(dep)))
      : provider.useFactory();

    this.providerMap.set(provider.provide, instance);

    return instance;
  }

  private findOverride(provider: Provider<any>): OverrideProvider<any> | null {
    if (this.opts.providers) {
      const override = this.opts.providers.find(override => override.provide === provider);

      return override || null;
    }

    return null;
  }
}

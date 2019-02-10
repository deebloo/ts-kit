export type ClassProvider<T> = {
  deps?: Provider<any>[];

  new (...args: any[]): T;
};

export type AbstractClassProvider<T> = Function & { prototype: T; deps?: Provider<any>[] };

export type Provider<T> = ClassProvider<T> | AbstractClassProvider<T>;

export interface ClassOverrideProvider<T> {
  provide: Provider<T>;
  useClass: ClassProvider<T>;
}

export interface FactoryOverrideProvider<T> {
  provide: Provider<T>;
  useFactory: (...args: any[]) => T;
  deps?: Provider<any>[];
}

export type OverrideProvider<T> = ClassOverrideProvider<T> | FactoryOverrideProvider<T>;

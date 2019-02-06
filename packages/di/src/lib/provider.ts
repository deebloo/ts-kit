export type ClassProvider<T> = {
  deps?: Provider<any>[];

  new (...args: any[]): T;
};

export type AbstractClassProvider<T> = Function & { prototype: T; deps?: Provider<any>[] };

export type Provider<T> = ClassProvider<T> | AbstractClassProvider<T>;

export interface OverrideProvider<T> {
  provide: Provider<T>;
  provider: ClassProvider<T>;
}

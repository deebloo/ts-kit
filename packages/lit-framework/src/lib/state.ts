import { Inject, SymbolToken } from '@ts-kit/di';

export class ComponentState<T> {
  private currentState!: T;

  constructor(private setter: (state: T) => T) {}

  setState(state: (state: T) => T): void {
    this.currentState = state(this.currentState);

    this.setter(this.currentState);
  }
}

export const State = () => (c: SymbolToken<any>, k: string, i: number) =>
  Inject(ComponentState)(c, k, i);

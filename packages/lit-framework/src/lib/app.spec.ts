import { bootstrapApplication } from './app';

describe('app', () => {
  it('should create a global Injector instance', () => {
    bootstrapApplication();

    expect(window.ROOT__INJECTOR__).toBeTruthy();
  });
});

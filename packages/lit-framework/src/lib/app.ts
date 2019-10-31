import { Injector } from '@ts-kit/di';
import { html as litHtml } from 'lit-html';

export const html = (strings: TemplateStringsArray, ...values: unknown[]) =>
  litHtml(strings, ...values);

export const bootstrapApplication = () => {
  window.ROOT__INJECTOR__ = new Injector();
};

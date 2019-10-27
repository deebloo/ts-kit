import { Injector } from '@ts-kit/di';
import { html as litHtml, render } from 'lit-html';
import page from 'page';

export const html = (strings: TemplateStringsArray, ...values: unknown[]) =>
  litHtml(strings, ...values);

interface RouteLoad {
  path: string;
  load: () => HTMLElement;
}

interface RouteRedirect {
  path: string;
  redirectTo: string;
}

type Route = RouteLoad | RouteRedirect;

export const createRouter = (routes: Route[]) => {
  return (outlet: HTMLElement) => {
    routes.forEach(route => {
      page(route.path, () => {
        if ('load' in route) {
          render(route.load(), outlet);
        } else if ('redirectTo' in route) {
          page.redirect(route.redirectTo);
        }
      });
    });

    page();
  };
};

export const createApp = (outlet: HTMLElement, router: (outlet: HTMLElement) => void) => {
  window.ROOT__INJECTOR__ = new Injector();

  if (router) {
    router(outlet);
  }
};

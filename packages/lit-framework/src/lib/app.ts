import { Injector } from '@ts-kit/di';
import { html as litHtml, render } from 'lit-html';
import page from 'page';

export const html = (strings: TemplateStringsArray, ...values: unknown[]) =>
  litHtml(strings, ...values);

interface RouteLoad {
  path: string;
  load: () => HTMLElement | Promise<HTMLElement>;
}

interface RouteRedirect {
  path: string;
  redirectTo: string;
}

type Route = RouteLoad | RouteRedirect;

type Feature = (outlet: HTMLElement, rootInjector: Injector) => void;

export const createRouter = (routes: Route[]): Feature => {
  return (outlet: HTMLElement) => {
    routes.forEach(route => {
      page(route.path, () => {
        if ('load' in route) {
          const routeRes = route.load();

          if (routeRes instanceof Promise) {
            routeRes.then(el => render(el, outlet));
          } else {
            render(route.load(), outlet);
          }
        } else if ('redirectTo' in route) {
          page.redirect(route.redirectTo);
        }
      });
    });

    page();
  };
};

export interface Application {
  host: HTMLElement;
  features: Feature[];
}

export const createApp = (app: Application) => {
  window.ROOT__INJECTOR__ = new Injector();

  app.features.forEach(feature => {
    feature(app.host, window.ROOT__INJECTOR__);
  });
};

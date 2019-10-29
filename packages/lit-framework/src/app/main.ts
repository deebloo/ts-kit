import { createRouter, createApp } from '../public_api';

const router = createRouter([
  {
    path: '/home',
    load: () => import('./app.component').then(() => document.createElement('app-root'))
  },
  { path: '*', redirectTo: '/home' }
]);

createApp({
  host: document.body,
  features: [router]
});

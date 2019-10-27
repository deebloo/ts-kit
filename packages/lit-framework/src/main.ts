import page from 'page';
import { render } from 'lit-html';

import {
  ComponentState,
  Component,
  State,
  html,
  Action,
  ElRef,
  createApp,
  createRouter
} from './public_api';

@Component<string>({
  tag: 'todo-form',
  template(_, run) {
    return html`
      <style>
        :host {
          display: flex;
          align-items: center;
        }

        form {
          padding: 1rem;
          background: #fff;
          box-shadow: 0 0px 0px rgba(0, 0, 0, 0.19), 0 2px 3px rgba(0, 0, 0, 0.23);
          width: 100%;
        }
      </style>

      <form @submit=${run('ON_SUBMIT')}>
        <input name="todo" autocomplete="off" />

        <button>Add Todo</button>
      </form>
    `;
  }
})
export class TodoForm {
  constructor(@ElRef() private elRef: HTMLElement) {}

  @Action('ON_SUBMIT') onSubmit(e: Event) {
    e.preventDefault();

    const target = e.target as HTMLFormElement;
    const input = target.querySelector('[name="todo"]') as HTMLInputElement;

    this.elRef.dispatchEvent(new CustomEvent('add_todo', { detail: input.value }));

    input.value = '';
  }
}

export interface AppComponentState {
  todos: string[];
}

@Component<AppComponentState>({
  tag: 'hello-world',
  template(state = { todos: [] }, run) {
    return html`
      <style>
        ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
          background: #fff;
          box-shadow: 0 0px 0px rgba(0, 0, 0, 0.19), 0 2px 3px rgba(0, 0, 0, 0.23);
        }

        ul li {
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
        }

        todo-form {
          margin-bottom: 1rem;
          width: 100%;
        }
      </style>

      <todo-form @add_todo=${run('ON_ADD_TODO')}></todo-form>

      <ul>
        ${state.todos.map(
          (todo, i) =>
            html`
              <li>${todo} <button @click=${run('ON_REMOVE_TODO', i)}>remove</button></li>
            `
        )}
      </ul>
    `;
  }
})
export class AppComponent {
  constructor(@State() private state: ComponentState<AppComponentState>) {}

  @Action('ON_ADD_TODO') onAddTodo(e: CustomEvent<string>) {
    this.state.setState((state = { todos: [] }) => {
      return { todos: [...state.todos, e.detail] };
    });
  }

  @Action('ON_REMOVE_TODO') onRemoveTodo(_: Event, index: number) {
    this.state.setState((state = { todos: [] }) => {
      return { todos: state.todos.filter((_, i) => i !== index) };
    });
  }
}

const router = createRouter([
  {
    path: '/foo',
    load: () => {
      const el = document.createElement('div');

      render(
        html`
          <h1>Hello World</h1>

          <button @click=${() => page('/bar')}>GO TO BAR</button>
        `,
        el
      );

      return el;
    }
  },
  { path: '/bar', load: () => document.createElement('hello-world') },
  { path: '*', redirectTo: '/foo' }
]);

createApp(document.body, router);

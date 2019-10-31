import './todo-form.component';

import { Component, html, State, ComponentState, Handle } from '../public_api';

export interface AppComponentState {
  todos: string[];
}

@Component<AppComponentState>({
  tag: 'app-root',
  defaultState: { todos: [] },
  style: html`
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
  `,
  template(state, run) {
    return html`
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

  @Handle('ON_ADD_TODO') onAddTodo(e: CustomEvent<string>) {
    this.state.setState(state => ({ todos: [...state.todos, e.detail] }));
  }

  @Handle('ON_REMOVE_TODO') onRemoveTodo(_: Event, index: number) {
    this.state.setState(state => ({ todos: state.todos.filter((_, i) => i !== index) }));
  }
}

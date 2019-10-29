import { Component, html, ElRef, Handle, Prop, State, ComponentState } from '../public_api';

@Component<string>({
  tag: 'todo-form',
  defaultState: '',
  template(state, run) {
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
        <input name="todo" autocomplete="off" .value=${state} @input=${run('ON_INPUT')} />

        <button>Add Todo</button>
      </form>
    `;
  }
})
export class TodoForm {
  @Prop() set value(val: string) {
    this.state.setState(() => val);
  }

  constructor(
    @ElRef() private elRef: HTMLElement,
    @State() private state: ComponentState<string>
  ) {}

  // This is an issue with how lit-html handles user input. the user value needs to be synced to the state
  @Handle('ON_INPUT') onInput(e: Event) {
    const input = e.target as HTMLInputElement;

    this.value = input.value;
  }

  @Handle('ON_SUBMIT') onSubmit(e: Event) {
    e.preventDefault();

    const form = new FormData(e.target as HTMLFormElement);

    this.elRef.dispatchEvent(
      new CustomEvent<string>('add_todo', { detail: form.get('todo') as string })
    );

    this.value = '';
  }
}

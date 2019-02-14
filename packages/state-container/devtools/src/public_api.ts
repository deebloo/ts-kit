import { StateContainer } from '@ts-kit/state-container';
import { take } from 'rxjs/operators';

const scope = window as any;
const devToolsExtension = scope['__REDUX_DEVTOOLS_EXTENSION__'];

const getSnapShot = async (container: StateContainer<any>) =>
  await container.value.pipe(take(1)).toPromise();

export const connectDevTools = async (container: StateContainer<any, any>): Promise<void> => {
  if (!devToolsExtension) {
    throw new Error('Could not find Redux Devtools Extension. Are you sure it is installed?');
  }

  const devTools = devToolsExtension.connect();

  devTools.init(await getSnapShot(container));

  devTools.subscribe(
    (message: {
      type: 'DISPATCH' | 'ACTION';
      state: any;
      payload: { type: 'JUMP_TO_ACTION' | 'TOGGLE_ACTION'; actionId: number };
    }) => {
      if (message.type === 'DISPATCH' && message.state) {
        if (message.payload.type === 'JUMP_TO_ACTION') {
          container.setState(() => message.state);
        }
      }
    }
  );

  container.actionStream.subscribe(async action => {
    devTools.send(action.type, await getSnapShot(container));
  });
};

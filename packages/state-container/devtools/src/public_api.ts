import { StateContainer, getSnapshot } from '@ts-kit/state-container';

const devToolsExtension = (window as any)['__REDUX_DEVTOOLS_EXTENSION__'];

type MessageType = 'DISPATCH' | 'ACTION';
type PayloadType = 'JUMP_TO_ACTION' | 'TOGGLE_ACTION';

interface DevToolsMessage {
  type: MessageType;
  state: any;
  payload: { type: PayloadType; actionId: number };
}

export const connectDevTools = async (container: StateContainer<any, any>): Promise<void> => {
  if (!devToolsExtension) {
    throw new Error('Could not find Redux Devtools Extension. Are you sure it is installed?');
  }

  const devTools = devToolsExtension.connect();

  devTools.init(await getSnapshot(container));

  devTools.subscribe((message: DevToolsMessage) => {
    if (message.type === 'DISPATCH' && message.state) {
      if (message.payload.type === 'JUMP_TO_ACTION') {
        container.setState(() => message.state);
      }
    }
  });

  container.actionStream.subscribe(async action => {
    devTools.send(action.type, await getSnapshot(container));
  });
};

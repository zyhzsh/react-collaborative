import { syncedStore, getYjsDoc } from '@syncedstore/core';
// @ts-ignore
import { WebrtcProvider } from 'y-webrtc';

export type Todo = { id: string; completed: boolean; title: string };
export type InputValueWrapper = { value: string };

const ServerURL = import.meta.env.VITE_SERVERURL;
class SyncEngineServer {
  public store = syncedStore({
    todos: [] as Todo[],
    inputValue: {} as InputValueWrapper,
  });

  private doc = getYjsDoc(this.store);
  private signalingServers = [ServerURL];
  //private indexeddbPersistence: IndexeddbPersistence;
  private webrtcProvider: WebrtcProvider;

  constructor() {
    this.webrtcProvider = new WebrtcProvider('todo-demo-4', this.doc, {
      signaling: this.signalingServers,
    });
    this.observeChanges();
    // this.webrtcProvider.on('change', (changes) => {
    //   console.log('changes', changes);
    // });
  }

  observeChanges() {
    this.doc.on('update', (update: any) => {
      const x = this.doc.getArray('todos');
      console.log('update', update, x.toJSON());
    });
  }

  connect = () => this.webrtcProvider.connect();

  disconnect = () => this.webrtcProvider.disconnect();
}

export const syncEngineServer = new SyncEngineServer();

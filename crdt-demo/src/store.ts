import { syncedStore, getYjsDoc } from '@syncedstore/core';
// @ts-ignore
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';

export type Todo = { id: string; completed: boolean; title: string };
export type InputValueWrapper = { value: string };

class SyncEngineServer {
  public store = syncedStore({
    todos: [] as Todo[],
    inputValue: {} as InputValueWrapper,
  });

  private doc = getYjsDoc(this.store);
  //private signalingServers = ['ws://localhost:4444'];
  private signalingServers = [
    // 'wss://signaling.yjs.dev',
    // 'wss://y-webrtc-signaling-eu.herokuapp.com',
    // 'wss://y-webrtc-signaling-us.herokuapp.com',
    //'ws://localhost:4444',
    //'wss://sync-engine-prototype.nw.r.appspot.com:4444',
    // 'ws://sync-engine-prototype.nw.r.appspot.com:4444',
    'wss://sync-engine-prototype.nw.r.appspot.com/',
    //'wss://sync-engine-signalling-32qfarbkya-ew.a.run.app',
  ];
  private indexeddbPersistence: IndexeddbPersistence;
  private webrtcProvider: WebrtcProvider;

  constructor() {
    this.indexeddbPersistence = new IndexeddbPersistence(
      'todo-demo-4',
      this.doc
    );
    this.webrtcProvider = new WebrtcProvider('todo-demo-4', this.doc, {
      signaling: this.signalingServers,
    });

    this.indexeddbPersistence.whenSynced.then(() => {
      console.log('The Yjs document has been synced with IndexedDB');
    });
  }

  connect = () => this.webrtcProvider.connect();

  disconnect = () => this.webrtcProvider.disconnect();
}

export const syncEngineServer = new SyncEngineServer();

import { store } from '../src/store/store';
import {
  setElements,
  updateElement,
} from '../src/components/WhiteBoard/WhiteBoardSlice';
import {
  removeCursorPosition,
  updateCursorPosition,
} from '../src/components/CursorOverlay/CursorOverlaySlice';

let socket;

export const connectWithSocketServer = () => {
  socket = new WebSocket('ws://localhost:3001');

  socket.addEventListener('open', (event) => {
    console.log('connected to WebSocket server');
  });

  socket.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);

    switch (data.event) {
      case 'whiteboard-state':
        console.log('initialized loading whiteboard');
        store.dispatch(setElements(data.payload));
        break;
      case 'element-update':
        store.dispatch(updateElement(data.payload));
        break;
      case 'whiteboard-clear':
        store.dispatch(setElements([]));
        break;
      case 'cursor-position':
        store.dispatch(updateCursorPosition(data.payload));
        break;
      case 'user-disconnected':
        store.dispatch(removeCursorPosition(data.payload));
        break;
    }
  });
};

export const emitElementUpdate = (elementData) => {
  socket.send(
    JSON.stringify({
      event: 'element-update',
      payload: elementData,
    })
  );
};

export const emitClearWhiteboard = () => {
  socket.send(
    JSON.stringify({
      event: 'whiteboard-clear',
    })
  );
};

export const emitCursorPosition = (cursorData) => {
  socket.send(
    JSON.stringify({
      event: 'cursor-position',
      payload: cursorData,
    })
  );
};

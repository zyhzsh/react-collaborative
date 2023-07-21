import { configureStore } from '@reduxjs/toolkit';
import WhiteBoardSlice from '../components/WhiteBoard/WhiteBoardSlice';
import CursorSlice from '../components/CursorOverlay/CursorOverlaySlice';

export const store = configureStore({
  reducer: {
    whiteboard: WhiteBoardSlice,
    cursor: CursorSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoreActions: ['whiteboard/setElements'],
      //   ignorePaths: ['whiteboard.elements'],
      // },
      serializableCheck: false,
    }),
});

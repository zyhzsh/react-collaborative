import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tool: null,
  elements: [],
};

const whiteboardSlice = createSlice({
  name: 'whiteboard',
  initialState,
  reducers: {
    setToolType: (state, action) => {
      state.tool = action.payload;
    },
    updateElement: (state, action) => {
      const { id } = action.payload;
      //Find existing element on the list
      const index = state.elements.findIndex((element) => element.id === id);
      //If element is not on the list, then add it to the list
      if (index === -1) {
        state.elements.push(action.payload);
      } else {
        // If element is on the list, then update it
        state.elements[index] = action.payload;
      }
    },
    setElements: (state, action) => {
      state.elements = action.payload;
    },
  },
});
export const { setToolType, updateElement, setElements } =
  whiteboardSlice.actions;

export default whiteboardSlice.reducer;

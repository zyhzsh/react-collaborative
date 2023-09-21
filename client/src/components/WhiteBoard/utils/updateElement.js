import { createElement } from '.';
import { toolTypes } from '../../../constants';
import { setElements } from '../WhiteBoardSlice';
import { store } from '../../../store/store';
import { emitElementUpdate } from '../../../../socketConn/socketConn';

export const updatePencilElementWhenMoving = (
  { index, newPoints },
  elements
) => {
  const elementsCopy = [...elements];

  elementsCopy[index] = {
    ...elementsCopy[index],
    points: newPoints,
  };
  const updatedPencilElement = elementsCopy[index];
  store.dispatch(setElements(elementsCopy));
  emitElementUpdate(updatedPencilElement);
};

export const updateElement = (
  { id, x1, x2, y1, y2, type, index, text },
  elements
) => {
  const elementsCopy = [...elements];

  switch (type) {
    case toolTypes.LINE:
    case toolTypes.RECTANGLE:
      const updatedElement = createElement({
        id,
        x1,
        x2,
        y1,
        y2,
        type,
      });
      elementsCopy[index] = updatedElement;

      store.dispatch(setElements(elementsCopy));

      emitElementUpdate(updatedElement);

      break;
    case toolTypes.PENCIL:
      elementsCopy[index] = {
        ...elementsCopy[index],
        points: [
          ...elementsCopy[index].points,
          {
            x: x2,
            y: y2,
          },
        ],
      };
      const updatedPencilElement = elementsCopy[index];

      store.dispatch(setElements(elementsCopy));

      emitElementUpdate(updatedPencilElement);
      break;
    case toolTypes.TEXT:
      const textWidth = document
        .getElementById('canvas')
        .getContext('2d')
        .measureText(text).width;
      const textHeight = 24;

      elementsCopy[index] = {
        ...createElement({
          id,
          x1,
          y1,
          x2: x1 + textWidth,
          y2: y1 + textHeight,
          type,
          text,
        }),
      };
      const updatedTextElement = elementsCopy[index];

      store.dispatch(setElements(elementsCopy));

      emitElementUpdate(updatedTextElement);

      break;
    default:
      throw new Error('Something went wrong');
  }
};

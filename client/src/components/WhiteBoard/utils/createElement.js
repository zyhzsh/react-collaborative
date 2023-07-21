import rough from 'roughjs';
import { toolTypes } from '../../../constants';

const generator = rough.generator();

const generateRectangle = ({ x1, y1, x2, y2 }) => {
  const width = x2 - x1;
  const height = y2 - y1;
  return generator.rectangle(x1, y1, width, height);
};
const generateLine = ({ x1, y1, x2, y2 }) => {
  return generator.line(x1, y1, x2, y2);
};

export const createElement = ({ x1, y1, x2, y2, type, id, text }) => {
  let roughElement;
  switch (type) {
    case toolTypes.RECTANGLE:
      roughElement = generateRectangle({ x1, y1, x2, y2 });
      return {
        id,
        roughElement,
        type,
        x1,
        y1,
        x2,
        y2,
      };
    case toolTypes.LINE:
      roughElement = generateLine({ x1, y1, x2, y2 });
      return {
        id,
        roughElement,
        type,
        x1,
        y1,
        x2,
        y2,
      };
    case toolTypes.PENCIL:
      return {
        id,
        type,
        points: [{ x: x1, y: y1 }],
      };
    case toolTypes.TEXT:
      return {
        id,
        type,
        x1,
        y1,
        x2,
        y2,
        text: text || '',
      };
    default:
      throw new Error('Something went wrong when creating element');
  }
};

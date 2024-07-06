import rough from "roughjs/bundled/rough.esm";
// const rough = require('roughjs/bundled/rough.cjs')
const generator = rough.generator();
export function createElement(id, x1, y1, x2, y2, type, width, strokeColor) {
  let roughElement = null;
  switch (type) {
    case "line":
      roughElement = generator.line(x1, y1, x2, y2, {
        stroke: strokeColor,
        strokeWidth: width,
      });
      break;
    case "rectangle":
      roughElement = generator.rectangle(x1, y1, x2 - x1, y2 - y1, {
        stroke: strokeColor,
        strokeWidth: width,
      });
      break;
    case "circle":
      roughElement = generator.circle(
        x1,
        y1,
        2 * Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
        {
          stroke: strokeColor,
          strokeWidth: width,
          
        }
      );
      break;
    case "triangle":
      roughElement = generator.linearPath(
        [
          [x1, y1],
          [x2, y2],
          [x1, y2],
          [x1, y1],
        ],
        {
          stroke: strokeColor,
          strokeWidth: width,
        }
      );
    
      break;

    default:
  }
  return {
    id,
    x1,
    y1,
    x2,
    y2,
    type,
    roughElement,
    width,
    strokeColor,
  };
}

export const adjustElementCoordinates = (element) => {
  const { type, x1, y1, x2, y2 } = element;
  if (type === "rectangle") {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);
    return { x1: minX, y1: minY, x2: maxX, y2: maxY };
  } else {
    if (x1 < x2 || (x1 === x2 && y1 < y2)) {
      return { x1, y1, x2, y2 };
    } else {
      return { x1: x2, y1: y2, x2: x1, y2: y1 };
    }
  }
};

export const midPointBtw = (p1, p2) => {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2,
  };
};
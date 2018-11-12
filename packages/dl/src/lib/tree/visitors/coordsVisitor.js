import { onPost } from "zippa";
import { Map } from "immutable";

export const coordsVisitor = onPost((item, state) => {
  const { uuid, _height, x, y, width, height } = item;
  const mid = y + height / 2;
  const right = x + width;
  const left = x;
  const prevState = state || Map();
  return _height == 0
    ? { state: prevState.set(uuid, { left, right, mid }) }
    : null;
});

import _ from "lodash/fp";
import { onPost } from "zippa";
import { getChildren } from "../../node";

const getHeight = d => {
  const children = getChildren(d) || [];
  const childHeights = _.map("_height")(children);
  const _height = _.isEmpty(children) ? 0 : 1 + _.max(childHeights);
  // console.log("Height", getId(d), childHeights, _height);
  return _height;
};

export const heightVisitor = onPost((item, _state) => {
  const _height = getHeight(item);
  const i = Object.assign({}, item, { _height });
  // console.log("POST", getId(item), i);
  return { item: i };
});

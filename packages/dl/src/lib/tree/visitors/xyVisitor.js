import _ from "lodash/fp";
import { onPre } from "zippa";
import { margin, padding } from "./styles";

const popToSibling = ({ parentId }, stack) =>
  stack.skipUntil(_.propEq("parentId", parentId));

export const xyVisitor = onPre((item, state) => {
  const prev = state.peek();
  if (prev) {
    if (item._height === prev._height) {
      // Sibling (leaf)
      const { x, y, height } = prev;
      // const parent = state.get(1);
      // console.log(`sibling ${item.name} < ${parent.external_id}`);
      const nextItem = {
        ...item,
        x,
        y: y + height + _.max([margin(prev).bottom, margin(item).top])
      };
      return { item: nextItem, state: state.shift().unshift(nextItem) };
    } else if (item._height < prev._height) {
      // Child
      const { x, y } = prev;
      // console.log(`child ${item.name} < ${prev.external_id || prev.uuid}`);
      const nextItem = {
        ...item,
        x: x + _.max([padding(prev).left, margin(item).left]),
        y: y + _.max([padding(prev).top, margin(item).top])
      };
      return { item: nextItem, state: state.unshift(nextItem) };
    } else {
      // Branch
      const { _cols } = prev;
      const stack = popToSibling(item, state);
      const sibling = stack.peek();
      const parent = stack.get(1);
      if (_.propEq("_cols", _cols)(item)) {
        // Same column...
        // console.log(`branch down ${item.name} < ${parent.external_id || parent.uuid}`);
        const { x, y, height } = sibling;
        const nextItem = {
          ...item,
          x,
          y: y + height + _.max([margin(sibling).bottom, margin(item).top])
        };
        return { item: nextItem, state: stack.shift().unshift(nextItem) };
      } else {
        // Next column...
        // console.log(`branch right ${item.name} < ${parent.external_id || parent.uuid}`);
        const { y } = parent;
        const { x, width } = sibling;
        const nextItem = {
          ...item,
          x: x + width + _.max([margin(sibling).right, margin(item).left]),
          y: y + _.max([padding(parent).top, margin(item).top])
        };
        return { item: nextItem, state: stack.shift().unshift(nextItem) };
      }
    }
  } else {
    // Root node
    const nextItem = { ...item, x: 0, y: 0 };
    return { item: nextItem, state: state.unshift(nextItem) };
  }
});

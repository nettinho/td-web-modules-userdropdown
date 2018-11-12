import _ from "lodash/fp";
import { onPre } from "zippa";

const popToParent = ({ uuid }, stack) =>
  stack.skipUntil(
    _.overSome([
      _.propEq("uuid", "ROOT"),
      _.conforms({ contains: _.includes(uuid) })
    ])
  );

export const parentVisitor = onPre((item, state) => {
  const prev = state.peek();
  if (prev) {
    if (item._height === prev._height) {
      // Sibling (leaf)
      const { uuid, _depth } = state.get(1);
      const nextItem = {
        ...item,
        parentId: uuid,
        _depth: _depth + 1
      };
      return { item: nextItem, state: state.shift().unshift(nextItem) };
    } else if (item._height < prev._height) {
      // Child
      const { uuid, _depth } = prev;
      const nextItem = {
        ...item,
        parentId: uuid,
        _depth: _depth + 1
      };
      return { item: nextItem, state: state.unshift(nextItem) };
    } else {
      // Branch
      const stack = popToParent(item, state);
      const { uuid, _depth } = stack.peek();
      const nextItem = {
        ...item,
        parentId: uuid,
        _depth: _depth + 1
      };
      return { item: nextItem, state: state.unshift(nextItem) };
    }
  } else {
    return { item: { ...item, _depth: -1 }, state: state.unshift(item) };
  }
});

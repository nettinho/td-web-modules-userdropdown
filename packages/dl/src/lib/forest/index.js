import _ from "lodash/fp";
import trampoline from "../trampoline";
import { makeNode } from "../node";

const withChildren = data =>
  trampoline(d => {
    const contains = _.getOr([], "contains")(d);
    const children = _.filter(({ uuid }) => _.includes(uuid)(contains))(data);
    return _.isEmpty(children)
      ? makeNode(d, undefined)
      : () => makeNode(d, _.map(withChildren(data))(children));
  });

export const forest = data => {
  const parents = _.filter(_.has("contains"))(data);
  const ids = _.map("uuid")(data);
  const childIds = _.flatMap("contains")(parents);
  const rootIds = _.without(childIds)(ids);
  const roots = _.filter(({ uuid }) => _.includes(uuid)(rootIds))(data);
  return _.map(withChildren(data))(roots);
};

export const makeTree = parent => data => makeNode(parent, forest(data));

export default forest;

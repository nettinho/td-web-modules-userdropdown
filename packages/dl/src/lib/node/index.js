import _ from "lodash/fp";

export const makeNode = (parent, children) =>
  children ? { ...parent, children } : parent;

export const getId = _.get("uuid");
export const isBranch = _.has("children");
export const getChildren = _.get("children");

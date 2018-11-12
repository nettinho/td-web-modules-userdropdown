import _ from "lodash/fp";

const isField = _.propEq("type", "lineage-field");
const isLeaf = _.propEq("_height", 0);
const isTable = _.propEq("type", "lineage-table");
const isFile = _.overSome([
  _.propEq("type", "File"),
  _.propEq("subtype", "FileHost")
]);

const boxModel = (top, right, bottom, left) =>
  _.constant({ top, right, bottom, left });

export const margin = _.cond([
  [isField, boxModel(0, 0, 0, 0)],
  [isLeaf, boxModel(12, 0, 12, 0)],
  [_.stubTrue, boxModel(12, 80, 24, 12)]
]);

export const padding = _.cond([
  [isLeaf, boxModel(0, 0, 0, 0)],
  [isTable, boxModel(24, 0, 0, 0)],
  [isFile, boxModel(24, 0, 0, 0)],
  [_.stubTrue, boxModel(30, 12, 12, 12)]
]);

import _ from "lodash/fp";

export const getUuids = _.flow([
  _.pathOr([], "paths.uuids"),
  _.map(_.toInteger)
]);

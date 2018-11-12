import _ from "lodash/fp";
import { createSelector } from "reselect";
import { columnMap } from "../lib/columnMap";
import { getPaths } from "./getPaths";
import { getUuids } from "./getUuids";

export const getColumnMap = createSelector([getPaths, getUuids], columnMap);

export const getSuccessorPairs = createSelector([getPaths], data =>
  _.flatMap(([uuid, deps]) => _.map(d => [uuid, d])(deps))(
    _.map(({ uuid, depends }) => [uuid, depends])(
      _.filter(_.has("depends"))(data)
    )
  )
);

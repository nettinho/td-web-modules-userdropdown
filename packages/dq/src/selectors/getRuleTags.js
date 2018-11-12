import _ from "lodash/fp";
import { createSelector } from "reselect";
import { getRule } from "./getRule";

export const getRuleTags = createSelector(
  [getRule],
  rule =>
    _.has("tag.tags")(rule)
      ? _.map(tag => _.get("name")(tag))(_.get("tag.tags")(rule))
      : []
);

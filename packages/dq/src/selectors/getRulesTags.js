import _ from "lodash/fp";
import { createSelector } from "reselect";
import { getRules } from "./getRules";

export const getRulesTags = createSelector([getRules], rules =>
  _.flow(
    _.reduce(
      (acc, rule) =>
        _.has("tag.tags")(rule)
          ? [
              ...acc,
              ..._.map(tag => _.get("name")(tag))(_.get("tag.tags")(rule))
            ]
          : acc,
      []
    ),
    _.uniq
  )(rules)
);

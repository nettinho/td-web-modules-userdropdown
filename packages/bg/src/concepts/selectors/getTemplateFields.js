import _ from "lodash/fp";
import { createSelector } from "reselect";
import { getConceptTemplate } from "./getConceptTemplate";

export const getTemplateFields = createSelector(
  [getConceptTemplate],
  template => {
    if (_.isArray(template)) {
      const fields = _.map(f => [
        _.getOr("", "name", f),
        _.getOr("", "default", f)
      ])(template);
      return _.fromPairs(fields);
    } else {
      return {};
    }
  }
);

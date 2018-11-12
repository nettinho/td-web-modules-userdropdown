import _ from "lodash/fp";
import { createSelector } from "reselect";
import { getConceptTemplate } from "./getConceptTemplate";

export const getTemplateGroups = createSelector(
  [getConceptTemplate],
  template => {
    if (_.isArray(template)) {
      return _.toPairs(_.groupBy("group")(template));
    } else {
      return [];
    }
  }
);

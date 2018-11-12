import _ from "lodash/fp";
import { createSelector } from "reselect";
import { getConcept } from "./getConcept";
import { getDomainTemplates } from "./getDomainTemplates";

export const findDefaultTemplate = createSelector(
  [getDomainTemplates, getConcept],
  (templates, concept) => {
    const domainTemplates = _.isEmpty(concept)
      ? templates
      : _.find(_.propEq("name", _.get("type")(concept)))(templates);
    return domainTemplates && domainTemplates.length == 1
      ? _.head(domainTemplates)
      : {};
  }
);

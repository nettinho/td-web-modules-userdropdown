import _ from "lodash/fp";
import { createSelector } from "reselect";
import { getDomainConcepts } from "./getDomainConcepts";

const buildConceptsOptions = m => ({
  value: m.business_concept_id,
  text: m.name
});

const isDeprecatedConcept = m =>
  !_.flow(
    _.get("status"),
    _.includes("deprecated")
  )(m);

export const getDomainConceptsOptions = createSelector(
  [getDomainConcepts],
  domainConcepts =>
    _.flow(
      _.filter(isDeprecatedConcept),
      _.map(buildConceptsOptions)
    )(domainConcepts)
);

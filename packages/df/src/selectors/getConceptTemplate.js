import { createSelector } from "reselect";
import { getConcept } from "./getConcept";

export const getConceptTemplate = createSelector([getConcept], concept => {
  const { template } = concept;
  return template ? template.content : {};
});

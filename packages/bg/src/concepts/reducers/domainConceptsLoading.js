import { fetchDomainConcepts } from "../routines";

export const domainConceptsLoading = (state = false, { type }) => {
  switch (type) {
    case fetchDomainConcepts.TRIGGER:
      return true;
    case fetchDomainConcepts.FULFILL:
      return false;
    default:
      return state;
  }
};

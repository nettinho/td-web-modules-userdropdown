import { fetchConceptFilters } from "../routines";

const conceptFiltersLoading = (state = false, { type }) => {
  switch (type) {
    case fetchConceptFilters.REQUEST:
      return true;
    case fetchConceptFilters.FULFILL:
      return false;
    default:
      return state;
  }
};

export { conceptFiltersLoading };

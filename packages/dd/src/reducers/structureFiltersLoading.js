import { fetchStructureFilters } from "../routines";

const structureFiltersLoading = (state = false, { type }) => {
  switch (type) {
    case fetchStructureFilters.REQUEST:
      return true;
    case fetchStructureFilters.FULFILL:
      return false;
    default:
      return state;
  }
};

export { structureFiltersLoading };

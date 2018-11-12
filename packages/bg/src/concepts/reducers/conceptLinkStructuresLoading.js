import { fetchConceptLinkStructures } from "../routines";

const conceptLinkStructuresLoading = (state = false, { type }) => {
  switch (type) {
    case fetchConceptLinkStructures.TRIGGER:
      return true;
    case fetchConceptLinkStructures.FULFILL:
      return false;
    default:
      return state;
  }
};

export { conceptLinkStructuresLoading };

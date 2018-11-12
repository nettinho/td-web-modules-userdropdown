import { fetchConceptLinks } from "../routines";

const conceptLinksLoading = (state = false, { type }) => {
  switch (type) {
    case fetchConceptLinks.TRIGGER:
      return true;
    case fetchConceptLinks.FULFILL:
      return false;
    default:
      return state;
  }
};

export { conceptLinksLoading };

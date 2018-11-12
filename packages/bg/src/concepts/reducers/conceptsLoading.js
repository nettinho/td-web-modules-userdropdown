import { fetchConcepts } from "../routines";

const conceptsLoading = (state = false, { type }) => {
  switch (type) {
    case fetchConcepts.TRIGGER:
      return true;
    case fetchConcepts.REQUEST:
      return true;
    case fetchConcepts.FULFILL:
      return false;
    default:
      return state;
  }
};

export { conceptsLoading };

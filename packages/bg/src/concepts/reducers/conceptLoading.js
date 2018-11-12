import { fetchConcept } from "../routines";

const conceptLoading = (state = false, { type }) => {
  switch (type) {
    case fetchConcept.TRIGGER:
      return true;
    case fetchConcept.FULFILL:
      return false;
    default:
      return state;
  }
};

export { conceptLoading };

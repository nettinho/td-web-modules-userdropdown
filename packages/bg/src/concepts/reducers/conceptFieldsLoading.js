import { fetchConceptFields } from "../routines";

const conceptFieldsLoading = (state = false, { type }) => {
  switch (type) {
    case fetchConceptFields.TRIGGER:
      return true;
    case fetchConceptFields.FULFILL:
      return false;
    default:
      return state;
  }
};

export { conceptFieldsLoading };

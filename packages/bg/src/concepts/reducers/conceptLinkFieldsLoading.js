import { fetchConceptLinkFields } from "../routines";

const conceptLinkFieldsLoading = (state = false, { type }) => {
  switch (type) {
    case fetchConceptLinkFields.TRIGGER:
      return true;
    case fetchConceptLinkFields.FULFILL:
      return false;
    default:
      return state;
  }
};

export { conceptLinkFieldsLoading };

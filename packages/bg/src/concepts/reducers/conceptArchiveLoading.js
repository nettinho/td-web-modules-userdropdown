import { fetchConceptArchive } from "../routines";

const conceptArchiveLoading = (state = false, { type }) => {
  switch (type) {
    case fetchConceptArchive.TRIGGER:
      return true;
    case fetchConceptArchive.REQUEST:
      return true;
    case fetchConceptArchive.FULFILL:
      return false;
    default:
      return state;
  }
};

export { conceptArchiveLoading };

import { downloadConcepts } from "../routines";

const conceptsDownloading = (state = false, { type }) => {
  switch (type) {
    case downloadConcepts.TRIGGER:
      return true;
    case downloadConcepts.FULFILL:
      return false;
    default:
      return state;
  }
};

export { conceptsDownloading };

import { fetchStructure } from "../routines";

const structureLoading = (state = false, { type }) => {
  switch (type) {
    case fetchStructure.TRIGGER:
      return true;
    case fetchStructure.FULFILL:
      return false;
    default:
      return state;
  }
};

export { structureLoading };

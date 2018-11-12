import { fetchStructures } from "../routines";

const structuresLoading = (state = false, { type }) => {
  switch (type) {
    case fetchStructures.TRIGGER:
      return true;
    case fetchStructures.FULFILL:
      return false;
    default:
      return state;
  }
};

export { structuresLoading };

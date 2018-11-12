import { fetchStructureField } from "../routines";

const structureFieldLoading = (state = false, { type }) => {
  switch (type) {
    case fetchStructureField.TRIGGER:
      return true;
    case fetchStructureField.FULFILL:
      return false;
    default:
      return state;
  }
};

export { structureFieldLoading };

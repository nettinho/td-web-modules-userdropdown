import { updateStructureField } from "../routines";

const structureFieldUpdating = (state = false, { type }) => {
  switch (type) {
    case updateStructureField.TRIGGER:
      return true;
    case updateStructureField.FULFILL:
      return false;
    default:
      return state;
  }
};

export { structureFieldUpdating };

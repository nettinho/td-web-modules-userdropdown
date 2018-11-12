import { updateStructure } from "../routines";

const structureUpdating = (state = false, { type }) => {
  switch (type) {
    case updateStructure.TRIGGER:
      return true;
    case updateStructure.FULFILL:
      return false;
    default:
      return state;
  }
};

export { structureUpdating };

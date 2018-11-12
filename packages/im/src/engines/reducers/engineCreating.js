import { createEngine } from "../routines";

const engineCreating = (state = false, { type }) => {
  switch (type) {
    case createEngine.TRIGGER:
      return true;
    case createEngine.FULFILL:
      return false;
    default:
      return state;
  }
};

export { engineCreating };

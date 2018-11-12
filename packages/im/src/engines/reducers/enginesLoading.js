import { fetchEngines } from "../routines";

const enginesLoading = (state = false, { type }) => {
  switch (type) {
    case fetchEngines.TRIGGER:
      return true;
    case fetchEngines.FULFILL:
      return false;
    default:
      return state;
  }
};

export { enginesLoading };

import { updateDomain } from "../routines";

const domainUpdating = (state = false, { type }) => {
  switch (type) {
    case updateDomain.TRIGGER:
      return true;
    case updateDomain.FULFILL:
      return false;
    default:
      return state;
  }
};

export { domainUpdating };

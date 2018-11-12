import { createDomain } from "../routines";

const domainCreating = (state = false, { type }) => {
  switch (type) {
    case createDomain.TRIGGER:
      return true;
    case createDomain.FULFILL:
      return false;
    default:
      return state;
  }
};

export { domainCreating };

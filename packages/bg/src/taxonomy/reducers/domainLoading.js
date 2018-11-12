import { fetchDomain } from "../routines";

const domainLoading = (state = false, { type }) => {
  switch (type) {
    case fetchDomain.TRIGGER:
      return true;
    case fetchDomain.FULFILL:
      return false;
    default:
      return state;
  }
};

export { domainLoading };

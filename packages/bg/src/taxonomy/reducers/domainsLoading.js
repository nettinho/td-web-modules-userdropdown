import { fetchDomains } from "../routines";

export const domainsLoading = (state = false, { type }) => {
  switch (type) {
    case fetchDomains.TRIGGER:
      return true;
    case fetchDomains.FULFILL:
      return false;
    default:
      return state;
  }
};

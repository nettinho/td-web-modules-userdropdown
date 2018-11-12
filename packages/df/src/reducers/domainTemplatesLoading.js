import { fetchDomainTemplates } from "../routines";

export const domainTemplatesLoading = (state = false, { type }) => {
  switch (type) {
    case fetchDomainTemplates.TRIGGER:
      return true;
    case fetchDomainTemplates.FULFILL:
      return false;
    default:
      return state;
  }
};

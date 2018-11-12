import { fetchDomainMembers } from "../routines";

export const domainMembersLoading = (state = false, { type }) => {
  switch (type) {
    case fetchDomainMembers.TRIGGER:
      return true;
    case fetchDomainMembers.FULFILL:
      return false;
    default:
      return state;
  }
};

import { addDomainMember } from "../routines";

export const domainMemberSaving = (state = false, { type }) => {
  switch (type) {
    case addDomainMember.TRIGGER:
      return true;
    case addDomainMember.FULFILL:
      return false;
    default:
      return state;
  }
};

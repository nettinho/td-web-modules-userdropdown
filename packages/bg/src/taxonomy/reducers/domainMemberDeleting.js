import { deleteDomainMember } from "../routines";

export const domainMemberDeleting = (state = [], { type, payload }) => {
  switch (type) {
    case deleteDomainMember.TRIGGER: {
      const { id } = payload;
      return [id];
    }
    case deleteDomainMember.FULFILL:
      return [];
    default:
      return state;
  }
};

import { fetchDomainTemplates, clearDomainTemplates } from "../routines";

const initialState = [];

export const domainTemplates = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearDomainTemplates.TRIGGER:
      return initialState;
    case fetchDomainTemplates.TRIGGER:
      return initialState;
    case fetchDomainTemplates.SUCCESS:
      return payload.data;
    default:
      return state;
  }
};

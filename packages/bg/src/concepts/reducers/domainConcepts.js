import { fetchDomainConcepts, clearDomainConcepts } from "../routines";

const initialState = [];

export const domainConcepts = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearDomainConcepts.TRIGGER:
      return initialState;
    case fetchDomainConcepts.TRIGGER:
      return initialState;
    case fetchDomainConcepts.SUCCESS:
      const { data } = payload;
      return data;
    default:
      return state;
  }
};

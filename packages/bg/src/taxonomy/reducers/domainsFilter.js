import { filterDomains, clearFilterDomains } from "../routines";

const initialState = "";

export const domainsFilter = (state = initialState, { type, payload }) => {
  switch (type) {
    case filterDomains.TRIGGER:
      const { query } = payload;
      return query;
    case clearFilterDomains.TRIGGER:
      return initialState;
    default:
      return state;
  }
};

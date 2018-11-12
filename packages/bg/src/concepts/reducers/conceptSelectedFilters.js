import _ from "lodash";
import {
  addConceptSelectedFilter,
  removeConceptSelectedFilter,
  openConceptFilter,
  clearConceptQueryFilters
} from "../routines";

const initialState = {
  selectedFilters: [],
  openFilter: undefined
};

export const conceptSelectedFilters = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case addConceptSelectedFilter.TRIGGER:
      return {
        ...state,
        selectedFilters: [...state.selectedFilters, payload],
        openFilter: payload
      };
    case removeConceptSelectedFilter.TRIGGER:
      return {
        ...state,
        selectedFilters: _.remove(state.selectedFilters, e => e != payload)
      };
    case clearConceptQueryFilters.TRIGGER:
      return initialState;
    case openConceptFilter.TRIGGER:
      return {
        ...state,
        openFilter: payload
      };
    default:
      return state;
  }
};

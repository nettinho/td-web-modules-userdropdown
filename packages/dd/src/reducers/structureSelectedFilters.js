import _ from "lodash";
import {
  addStructureSelectedFilter,
  removeStructureSelectedFilter,
  openStructureFilter,
  clearStructureQueryFilters
} from "../routines";

const initialState = {
  selectedFilters: [],
  openFilter: undefined
};

export const structureSelectedFilters = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case addStructureSelectedFilter.TRIGGER:
      return {
        ...state,
        selectedFilters: [...state.selectedFilters, payload],
        openFilter: payload
      };
    case removeStructureSelectedFilter.TRIGGER:
      return {
        ...state,
        selectedFilters: _.remove(state.selectedFilters, e => e != payload)
      };
    case clearStructureQueryFilters.TRIGGER:
      return initialState;
    case openStructureFilter.TRIGGER:
      return {
        ...state,
        openFilter: payload
      };
    default:
      return state;
  }
};

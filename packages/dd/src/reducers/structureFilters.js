import _ from "lodash/fp";
import { clearStructureFilters, fetchStructureFilters } from "../routines";

const initialState = {};

const structureFilters = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearStructureFilters.TRIGGER:
      return initialState;
    case fetchStructureFilters.REQUEST:
      return initialState;
    case fetchStructureFilters.SUCCESS:
      return _.getOr({}, "data")(payload);
    default:
      return state;
  }
};

export { structureFilters };

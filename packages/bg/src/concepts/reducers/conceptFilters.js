import _ from "lodash/fp";
import { clearConceptFilters, fetchConceptFilters } from "../routines";

const initialState = {};

const conceptFilters = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearConceptFilters.TRIGGER:
      return initialState;
    case fetchConceptFilters.REQUEST:
      return initialState;
    case fetchConceptFilters.SUCCESS:
      return _.getOr({}, "data")(payload);
    default:
      return state;
  }
};

export { conceptFilters };

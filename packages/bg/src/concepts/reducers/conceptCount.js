import _ from "lodash/fp";
import { fetchConcepts, clearConcepts } from "../routines";

const initialState = 0;

const conceptCount = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearConcepts.TRIGGER:
      return initialState;
    case fetchConcepts.SUCCESS: {
      const headers = _.getOr({}, "headers")(payload);
      const count = _.getOr("0", "x-total-count")(headers);
      return parseInt(count);
    }
    default:
      return state;
  }
};

export { conceptCount };

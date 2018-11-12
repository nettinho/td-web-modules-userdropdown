import _ from "lodash/fp";
import { fetchStructures, clearStructures } from "../routines";

const initialState = 0;

const structureCount = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearStructures.TRIGGER:
      return initialState;
    case fetchStructures.SUCCESS: {
      const headers = _.getOr({}, "headers")(payload);
      const count = _.getOr("0", "x-total-count")(headers);
      return parseInt(count);
    }
    default:
      return state;
  }
};

export { structureCount };

import _ from "lodash/fp";
import { clearConceptRules, fetchConceptRules } from "../routines";

const initialState = [];

const conceptRules = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearConceptRules.TRIGGER:
      return initialState;
    case fetchConceptRules.TRIGGER:
      return initialState;
    case fetchConceptRules.SUCCESS: {
      const collection = _.get("data")(payload);
      return collection;
    }
    default:
      return state;
  }
};

export { conceptRules };

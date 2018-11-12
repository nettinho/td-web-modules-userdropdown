import _ from "lodash/fp";
import { fetchConcepts, clearConcepts } from "../routines";

const initialState = {};

export const conceptsActions = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearConcepts.TRIGGER:
      return initialState;
    case fetchConcepts.REQUEST: {
      const { query } = payload || {};
      return query ? state : initialState;
    }
    case fetchConcepts.SUCCESS: {
      const data = _.getOr({}, "data")(payload);
      return _.getOr(initialState, "_actions")(data);
    }
    default:
      return state;
  }
};

export default conceptsActions;

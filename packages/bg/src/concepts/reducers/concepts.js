import _ from "lodash/fp";
import { fetchConcepts, clearConcepts } from "../routines";

const initialState = [];

const concepts = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearConcepts.TRIGGER:
      return initialState;
    case fetchConcepts.SUCCESS: {
      const data = _.getOr({}, "data")(payload);
      return _.flow(
        _.getOr([], "data"),
        _.sortBy(f => _.deburr(f.name))
      )(data);
    }
    case fetchConcepts.FAILURE:
      return initialState;
    default:
      return state;
  }
};

export { concepts };

import _ from "lodash/fp";
import { fetchConceptFields } from "../routines";

const initialState = [];

const pickFields = _.pick(["system", "group", "structure", "name"]);

const conceptFields = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchConceptFields.TRIGGER:
      return initialState;
    case fetchConceptFields.SUCCESS:
      return _.flow(
        _.getOr([], "data"),
        _.map(pickFields),
        _.sortBy(f => _.deburr(f.name))
      )(payload);
    default:
      return state;
  }
};

export { conceptFields };

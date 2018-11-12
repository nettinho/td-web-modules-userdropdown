import _ from "lodash/fp";
import { fetchConceptLinkStructures } from "../routines";

const initialState = [];

const pickFields = _.pick(["id", "ou", "system", "group", "name"]);

const conceptLinkStructures = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchConceptLinkStructures.TRIGGER:
      return initialState;
    case fetchConceptLinkStructures.SUCCESS:
      return _.flow(
        _.getOr([], "data"),
        _.map(pickFields),
        _.sortBy(f => _.deburr(f.name))
      )(payload);
    default:
      return state;
  }
};

export { conceptLinkStructures };

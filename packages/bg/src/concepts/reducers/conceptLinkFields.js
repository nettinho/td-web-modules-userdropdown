import _ from "lodash/fp";
import { fetchConceptLinkFields } from "../routines";

const initialState = [];

const pickFields = _.pick(["id", "name"]);

const conceptLinkFields = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchConceptLinkFields.TRIGGER:
      return initialState;
    case fetchConceptLinkFields.SUCCESS:
      return _.flow(
        _.getOr([], "data"),
        _.map(pickFields),
        _.sortBy(f => _.deburr(f.name))
      )(payload);
    default:
      return state;
  }
};

export { conceptLinkFields };

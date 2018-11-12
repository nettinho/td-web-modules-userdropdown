import _ from "lodash/fp";
import { fetchConceptLinks, deleteConceptLink } from "../routines";

const initialState = [];

const pickFields = _.pick(["id", "resource_id", "resource_type", "field"]);

const conceptLinks = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case fetchConceptLinks.TRIGGER:
      return initialState;
    case fetchConceptLinks.SUCCESS:
      return _.flow(
        _.getOr([], "data"),
        _.map(pickFields)
      )(payload);
    case deleteConceptLink.SUCCESS: {
      const { id } = meta;
      return _.reject(_.propEq("id", id))(state);
    }
    default:
      return state;
  }
};

export { conceptLinks };

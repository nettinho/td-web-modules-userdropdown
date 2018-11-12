import _ from "lodash/fp";
import { fetchConceptLinks } from "../routines";

const initialState = {};

export const conceptLinksActions = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case fetchConceptLinks.TRIGGER:
      return initialState;
    case fetchConceptLinks.REQUEST:
      return initialState;
    case fetchConceptLinks.SUCCESS:
      return _.getOr({}, "_actions")(payload);
    default:
      return state;
  }
};

export default conceptLinksActions;

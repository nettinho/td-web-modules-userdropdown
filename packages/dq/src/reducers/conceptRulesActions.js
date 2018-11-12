import _ from "lodash/fp";
import { clearConceptRules, fetchConceptRules } from "../routines";

const initialState = {};

export const conceptRulesActions = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case clearConceptRules.TRIGGER:
      return initialState;
    case fetchConceptRules.TRIGGER:
      return initialState;
    case fetchConceptRules.REQUEST:
      return initialState;
    case fetchConceptRules.SUCCESS:
      return _.getOr({}, "_actions")(payload);
    default:
      return state;
  }
};

export default conceptRulesActions;

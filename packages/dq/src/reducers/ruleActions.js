import _ from "lodash/fp";
import { clearRule, fetchRule } from "../routines";

const initialState = {};

export const ruleActions = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearRule.TRIGGER:
      return initialState;
    case fetchRule.TRIGGER:
      return initialState;
    case fetchRule.SUCCESS:
      return _.getOr({}, "_actions")(payload);
    default:
      return state;
  }
};

export default ruleActions;

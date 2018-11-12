import _ from "lodash/fp";
import { fetchRuleTypes } from "../routines";

const initialState = [];

const pickFields = _.pick(["id", "name", "params"]);

const ruleTypes = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchRuleTypes.TRIGGER:
      return initialState;
    case fetchRuleTypes.SUCCESS:
      return _.sortBy("name")(_.map(pickFields)(payload.data)) || [];
    default:
      return state;
  }
};

export { ruleTypes };

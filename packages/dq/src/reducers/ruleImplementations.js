import _ from "lodash/fp";
import { fetchRuleImplementations } from "../routines";

const initialState = [];

const pickFields = _.pick([
  "id",
  "implementation_key",
  "description",
  "system",
  "system_params",
  "rule",
  "rule_results"
]);

const ruleImplementations = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchRuleImplementations.TRIGGER:
      return initialState;
    case fetchRuleImplementations.SUCCESS:
      return (
        _.sortBy("implementation_key")(_.map(pickFields)(payload.data)) || []
      );
    default:
      return state;
  }
};

export { ruleImplementations };

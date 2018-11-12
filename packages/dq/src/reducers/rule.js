import _ from "lodash/fp";
import { updateRule, clearRule, fetchRule } from "../routines";

const initialState = {};

const pickFields = _.pick([
  "id",
  "active",
  "business_concept_id",
  "deleted_at",
  "current_business_concept_version",
  "name",
  "description",
  "goal",
  "minimum",
  "principle",
  "rule_type_id",
  "rule_type",
  "type_params",
  "tag"
]);

const rule = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchRule.TRIGGER:
      return initialState;
    case fetchRule.SUCCESS:
      return pickFields(payload.data) || {};
    case clearRule.TRIGGER:
      return initialState;
    case updateRule.SUCCESS:
      return Object.assign({}, state, pickFields(payload.data));
    default:
      return state;
  }
};

export { rule };

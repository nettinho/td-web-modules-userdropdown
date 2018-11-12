import _ from "lodash/fp";
import { fetchRules } from "../routines";

const initialState = [];

const pickFields = _.pick([
  "id",
  "current_business_concept_version",
  "business_concept_id",
  "deleted_at",
  "name",
  "description",
  "goal",
  "minimum",
  "principle",
  "rule_type",
  "type_params",
  "active",
  "tag"
]);

const rules = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchRules.TRIGGER:
      return initialState;
    case fetchRules.SUCCESS:
      return _.sortBy("name")(_.map(pickFields)(payload.data)) || [];
    default:
      return state;
  }
};

export { rules };

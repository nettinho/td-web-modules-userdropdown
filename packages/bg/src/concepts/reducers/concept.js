import _ from "lodash/fp";
import { clearConcept, conceptAction, fetchConcept } from "../routines";

const initialState = {};

const pickFields = _.pick([
  "id",
  "parent",
  "parent_id",
  "children",
  "content",
  "description",
  "domain",
  "name",
  "business_concept_id",
  "status",
  "type",
  "version",
  "template",
  "last_change_at",
  "last_change_by",
  "last_change_user",
  "related_to",
  "graphs",
  "completeness",
  "in_progress"
]);

export const concept = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case clearConcept.TRIGGER:
      return initialState;
    case fetchConcept.TRIGGER:
      return initialState;
    case fetchConcept.SUCCESS:
      return pickFields(payload.data);
    case conceptAction.SUCCESS:
      return _.propEq("method", "DELETE")(meta)
        ? initialState
        : pickFields(payload.data);
    default:
      return state;
  }
};

export default concept;

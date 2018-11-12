import _ from "lodash/fp";
import {
  clearStructureField,
  fetchStructureField,
  updateStructureField
} from "../routines";

const initialState = {};

const pickFields = _.pick([
  "id",
  "name",
  "description",
  "type",
  "nullable",
  "precision"
]);

const structureField = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchStructureField.TRIGGER:
      return initialState;
    case fetchStructureField.SUCCESS:
      return pickFields(payload.data) || {};
    case clearStructureField.TRIGGER:
      return initialState;
    case updateStructureField.SUCCESS:
      return Object.assign({}, state, pickFields(payload.data));
    default:
      return state;
  }
};

export { structureField };

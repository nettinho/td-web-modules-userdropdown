import _ from "lodash/fp";
import {
  fetchStructure,
  updateStructure,
  updateStructureField
} from "../routines";

const initialState = {};

const pickFields = _.pick([
  "description",
  "group",
  "id",
  "inserted_at",
  "last_change_at",
  "lopd",
  "name",
  "ou",
  "system",
  "type",
  "data_fields"
]);

const pickFieldFields = _.pick([
  "id",
  "name",
  "description",
  "type",
  "nullable",
  "precision",
  "external_id",
  "inserted_at",
  "last_change_at",
  "last_change_by",
  "business_concept_id",
  "bc_related"
]);

const structure = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchStructure.TRIGGER:
      return initialState;
    case fetchStructure.SUCCESS:
      return pickFields(payload.data) || {};
    case updateStructure.SUCCESS:
      return Object.assign({}, state, pickFields(payload.data));
    case updateStructureField.SUCCESS:
      const { data } = payload || {};
      state.data_fields =
        data && data.id
          ? _.flow(
              _.filter(_.negate(_.propEq("id", data.id))),
              _.concat(pickFieldFields(data))
            )(state.data_fields)
          : state.data_fields;
      return state;
    default:
      return state;
  }
};

export { structure };

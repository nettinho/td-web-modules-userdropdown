import _ from "lodash/fp";
import { fetchRole, updateRole } from "../routines";

const initialState = {};

const pickFields = _.pick(["id", "name", "is_default"]);

const role = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchRole.TRIGGER:
      return initialState;
    case updateRole.SUCCESS:
    case fetchRole.SUCCESS:
      return pickFields(payload.data);
    default:
      return state;
  }
};

export { role };

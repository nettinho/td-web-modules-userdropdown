import _ from "lodash/fp";
import {
  fetchRole,
  fetchRolePermissions,
  updateRolePermissions
} from "../routines";

const initialState = [];

const pickFields = _.pick(["id", "name"]);

const rolePermissions = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchRole.TRIGGER:
      return initialState;
    case updateRolePermissions.SUCCESS:
      return _.map(pickFields)(payload.data);
    case fetchRolePermissions.SUCCESS:
      return _.map(pickFields)(payload.data);
    default:
      return state;
  }
};

export { rolePermissions };

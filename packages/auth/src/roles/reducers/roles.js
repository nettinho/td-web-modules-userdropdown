import _ from "lodash/fp";
import { fetchRoles, clearRoles } from "../routines";

const initialState = [];

const roles = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearRoles.TRIGGER:
      return initialState;
    case fetchRoles.SUCCESS:
      return _.sortBy("name")(payload.data);
    default:
      return state;
  }
};

const rolesLoading = (state = false, { type }) => {
  switch (type) {
    case fetchRoles.TRIGGER:
      return true;
    case fetchRoles.FULFILL:
      return false;
    default:
      return state;
  }
};

export { roles, rolesLoading };

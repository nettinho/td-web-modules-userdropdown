import _ from "lodash/fp";
import { clearUser, fetchUser, updateUser, createUser } from "../routines";

const initialState = {};

const pickFields = _.pick([
  "id",
  "user_name",
  "is_admin",
  "groups",
  "full_name",
  "email",
  "acls"
]);

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearUser.TRIGGER:
      return initialState;
    case fetchUser.TRIGGER:
      return initialState;
    case fetchUser.SUCCESS:
      return pickFields(payload.data);
    case updateUser.SUCCESS:
      return pickFields(payload.data);
    default:
      return state;
  }
};

const userLoading = (state = false, { type }) => {
  switch (type) {
    case fetchUser.TRIGGER:
      return true;
    case fetchUser.FULFILL:
      return false;
    default:
      return state;
  }
};

const userCreating = (state = false, { type }) => {
  switch (type) {
    case createUser.TRIGGER:
      return true;
    case createUser.FULFILL:
      return false;
    default:
      return state;
  }
};

const userUpdating = (state = false, { type }) => {
  switch (type) {
    case updateUser.TRIGGER:
      return true;
    case updateUser.FULFILL:
      return false;
    default:
      return state;
  }
};

export { user, userLoading, userCreating, userUpdating };

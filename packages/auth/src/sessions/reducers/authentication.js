import _ from "lodash/fp";
import { login, auth0Login } from "../routines";
import { RECEIVE_LOGOUT, RECEIVE_TOKEN } from "../actions";

const loginSubmitting = (state = false, { type }) => {
  switch (type) {
    case login.TRIGGER:
      return true;
    case login.FULFILL:
      return false;
    default:
      return state;
  }
};

const initialState = {
  auth_realm: undefined,
  token: undefined,
  is_admin: false,
  has_permissions: false
};

const authentication = (state = initialState, { type, payload, ...data }) => {
  switch (type) {
    case login.TRIGGER:
      const { auth_realm } = payload;
      return { ...initialState, auth_realm };
    case auth0Login.SUCCESS:
      return Object.assign(
        {},
        state,
        _.pick([
          "user_name",
          "token",
          "is_admin",
          "has_permissions",
          "remember"
        ])(payload)
      );
    case login.SUCCESS:
      return Object.assign(
        {},
        state,
        _.pick([
          "user_name",
          "token",
          "is_admin",
          "has_permissions",
          "remember"
        ])(payload)
      );
    case login.FAILURE:
      return initialState;
    case RECEIVE_TOKEN:
      return Object.assign(
        {},
        state,
        _.pick([
          "user_name",
          "token",
          "is_admin",
          "has_permissions",
          "remember"
        ])(data)
      );
    case RECEIVE_LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export { loginSubmitting, authentication };

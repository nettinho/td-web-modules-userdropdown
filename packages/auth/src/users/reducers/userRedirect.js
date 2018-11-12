import { clearRedirect } from "@truedat/core/routines";
import { createUser, deleteUser, updateUser } from "../routines";
import routes from "../routes";

const initialState = "";

const usersUrl = () => routes.USER_LIST;

export const userRedirect = (state = initialState, { type }) => {
  switch (type) {
    case clearRedirect.TRIGGER:
      return initialState;
    case createUser.SUCCESS:
      return usersUrl();
    case updateUser.SUCCESS:
      return usersUrl();
    case deleteUser.SUCCESS:
      return usersUrl();
    default:
      return state;
  }
};

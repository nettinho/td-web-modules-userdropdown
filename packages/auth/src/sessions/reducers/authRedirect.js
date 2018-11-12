import { clearRedirect } from "@truedat/core/routines";
import { auth0Login, openIdLogin } from "../routines";

const initialState = "";

const authRedirect = (state = initialState, { type }) => {
  switch (type) {
    case clearRedirect.TRIGGER:
      return initialState;
    case auth0Login.FAILURE:
      return "/login";
    case auth0Login.SUCCESS:
      return "/";
    case openIdLogin.FAILURE:
      return "/login";
    case openIdLogin.SUCCESS:
      return "/";
    default:
      return state;
  }
};

export { authRedirect };

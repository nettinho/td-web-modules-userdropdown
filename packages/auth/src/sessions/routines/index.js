import { createRoutine } from "redux-saga-routines";

export const login = createRoutine("LOGIN");
export const auth0Login = createRoutine("AUTH0");
export const openIdLogin = createRoutine("OPENID");

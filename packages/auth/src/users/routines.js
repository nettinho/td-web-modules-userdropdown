import { createRoutine } from "redux-saga-routines";

export const clearUser = createRoutine("CLEAR_USER");
export const createUser = createRoutine("CREATE_USER");
export const deleteUser = createRoutine("DELETE_USER");
export const fetchUser = createRoutine("FETCH_USER");
export const fetchUsers = createRoutine("FETCH_USERS");
export const updateUser = createRoutine("UPDATE_USER");

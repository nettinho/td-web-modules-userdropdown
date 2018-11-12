import { createRoutine } from "redux-saga-routines";

export const clearGroup = createRoutine("CLEAR_GROUP");
export const createGroup = createRoutine("CREATE_GROUP");
export const deleteGroup = createRoutine("DELETE_GROUP");
export const fetchGroup = createRoutine("FETCH_GROUP");
export const fetchGroups = createRoutine("FETCH_GROUPS");
export const updateGroup = createRoutine("UPDATE_GROUP");

import { createRoutine } from "redux-saga-routines";

export const createRole = createRoutine("CREATE_ROLE");
export const updateRole = createRoutine("UPDATE_ROLE");
export const deleteRole = createRoutine("DELETE_ROLE");
export const fetchPermissions = createRoutine("FETCH_PERMISSIONS");
export const fetchRole = createRoutine("FETCH_ROLE");
export const fetchRolePermissions = createRoutine("FETCH_ROLE_PERMISSIONS");
export const updateRolePermissions = createRoutine("UPDATE_ROLE_PERMISSIONS");
export const fetchRoles = createRoutine("FETCH_ROLES");
export const clearRoles = createRoutine("CLEAR_ROLES");

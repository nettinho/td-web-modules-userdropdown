import { createRoutine } from "redux-saga-routines";

export const hideSidebar = createRoutine("HIDE_SIDEBAR");
export const toggleSidebar = createRoutine("TOGGLE_SIDEBAR");
export const clearRedirect = createRoutine("CLEAR_REDIRECT");
export const fetchComments = createRoutine("FETCH_COMMENTS");
export const clearComments = createRoutine("CLEAR_COMMENTS");
export const fetchEvents = createRoutine("FETCH_EVENTS");
export const clearEvents = createRoutine("CLEAR_EVENTS");
export const createComment = createRoutine("CREATE_COMMENT");

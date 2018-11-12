import { createRoutine } from "redux-saga-routines";

export const clearStructure = createRoutine("CLEAR_STRUCTURE");
export const fetchStructure = createRoutine("FETCH_STRUCTURE");
export const updateStructure = createRoutine("UPDATE_STRUCTURE");

export const clearStructures = createRoutine("CLEAR_STRUCTURES");
export const fetchStructures = createRoutine("FETCH_STRUCTURES");
export const selectStructurePage = createRoutine("SELECT_STRUCTURE_PAGE");

export const clearStructureField = createRoutine("CLEAR_STRUCTURE_FIELD");
export const fetchStructureField = createRoutine("FETCH_STRUCTURE_FIELD");
export const updateStructureField = createRoutine("UPDATE_STRUCTURE_FIELD");

export const fetchDomains = createRoutine("FETCH_DOMAINS"); // TODO: Is there a way to avoid repeating this routine here?

export const fetchStructureFilters = createRoutine("FETCH_STRUCTURE_FILTERS");
export const clearStructureFilters = createRoutine("CLEAR_STRUCTURE_FILTERS");

export const openStructureFilter = createRoutine("OPEN_STRUCTURE_FILTER");
export const closeStructureFilter = createRoutine("OPEN_STRUCTURE_FILTER");

export const addStructureSelectedFilter = createRoutine(
  "ADD_STRUCTURE_SELECTED_FILTER"
);
export const removeStructureSelectedFilter = createRoutine(
  "REMOVE_STRUCTURE_SELECTED_FILTER"
);

export const clearStructureQueryFilters = createRoutine(
  "CLEAR_STRUCTURE_QUERY_FILTERS"
);

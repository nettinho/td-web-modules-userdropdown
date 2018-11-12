import { createRoutine } from "redux-saga-routines";

export const fetchDatalakes = createRoutine("FETCH_DATALAKES");
export const clearDatalakes = createRoutine("CLEAR_DATALAKES");

export const createEngine = createRoutine("CREATE_ENGINE");

export const fetchEngines = createRoutine("FETCH_ENGINES");
export const clearEngines = createRoutine("CLEAR_ENGINES");

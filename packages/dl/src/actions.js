import {
  REQUEST_ELEMENTS_BY_LEVEL,
  SET_RESOURCES_LIST,
  CLEAN_RESOURCES_LIST,
  REDIRECT_TO_VISUALIZATION,
  LINEAGE_CLEAN_STATE
} from "./constants";

export const retrieveNodesById = (uuidElement, currentLevel) => ({
  type: REQUEST_ELEMENTS_BY_LEVEL,
  uuidElement,
  currentLevel
});

export const setSelectedResourcesList = listUuids => ({
  type: SET_RESOURCES_LIST,
  listUuids
});

export const clearResourcesList = () => ({
  type: CLEAN_RESOURCES_LIST
});

export const redirectToVisualization = typeVisualization => ({
  type: REDIRECT_TO_VISUALIZATION,
  typeVisualization: typeVisualization
});

export const cleanState = () => ({
  type: LINEAGE_CLEAN_STATE
});

import _ from "lodash/fp";
import {
  SET_RESOURCES_LIST,
  CLEAN_RESOURCES_LIST,
  REDIRECT_TO_VISUALIZATION,
  LINEAGE_CLEAN_STATE
} from "../constants";

const initialStateResources = {
  listSelectedResources: [],
  redirectToVisualization: false,
  typeVisualization: ""
};

export const lineageResources = (
  state = initialStateResources,
  { type, listUuids, typeVisualization }
) => {
  switch (type) {
    case SET_RESOURCES_LIST:
      return {
        ...state,
        listSelectedResources: listUuids
      };
    case CLEAN_RESOURCES_LIST:
      return { ...state, listSelectedResources: [] };
    case REDIRECT_TO_VISUALIZATION:
      return { ...state, redirectToVisualization: true, typeVisualization };
    case LINEAGE_CLEAN_STATE:
      return { ...initialStateResources };
    default:
      return initialStateResources;
  }
};

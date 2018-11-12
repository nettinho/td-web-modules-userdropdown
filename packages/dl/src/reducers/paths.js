import _ from "lodash/fp";
import { fetchPaths } from "../routines";

const initialState = {};

const paths = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchPaths.SUCCESS:
      return _.get("data")(payload);
    default:
      return state;
  }
};

const pathsLoading = (state = false, { type }) => {
  switch (type) {
    case fetchPaths.TRIGGER:
      return true;
    case fetchPaths.FULFILL:
      return false;
    default:
      return state;
  }
};

export { paths, pathsLoading };

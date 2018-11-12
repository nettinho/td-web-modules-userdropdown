import _ from "lodash/fp";
import { conceptAction } from "../routines";

const conceptActionLoading = (state = "", { type, payload }) => {
  switch (type) {
    case conceptAction.TRIGGER:
      return _.getOr("", "href")(payload);
    case conceptAction.FULFILL:
      return "";
    default:
      return state;
  }
};

export { conceptActionLoading };

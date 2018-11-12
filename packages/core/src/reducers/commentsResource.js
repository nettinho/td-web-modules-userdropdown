import _ from "lodash/fp";
import { clearComments, fetchComments } from "../routines";

const initialState = {};

const pickFields = _.pick(["resource_id", "resource_type"]);

const commentsResource = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchComments.REQUEST:
      return pickFields(payload);
    case clearComments.TRIGGER:
      return initialState;
    default:
      return state;
  }
};

export { commentsResource };

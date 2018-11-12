import _ from "lodash/fp";
import { clearComments, createComment, fetchComments } from "../routines";

const initialState = [];
const pickFields = _.pick([
  "resource_id",
  "resource_type",
  "content",
  "user",
  "created_at"
]);

const renderCommentsList = ({ data }, state) => (data ? [data, ...state] : []);

const comments = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchComments.TRIGGER:
      return initialState;
    case clearComments.TRIGGER:
      return initialState;
    case fetchComments.SUCCESS:
      return _.map(pickFields)(payload.data) || [];
    case createComment.SUCCESS:
      return renderCommentsList(payload, state);
    default:
      return state;
  }
};

export { comments };

import { fetchComments, createComment } from "../routines";

const commentsLoading = (state = false, { type }) => {
  switch (type) {
    case fetchComments.TRIGGER:
      return true;
    case createComment.TRIGGER:
      return true;
    case createComment.FULFILL:
      return false;
    case fetchComments.FULFILL:
      return false;
    default:
      return state;
  }
};

export { commentsLoading };

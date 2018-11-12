import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { injectIntl } from "react-intl";
import { Comment, Header } from "semantic-ui-react";
import CommentRow from "./CommentRow";
import CommentsForm from "./CommentsForm";

export const Comments = ({
  comments,
  commentsResource,
  intl: { formatMessage }
}) => (
  <Comment.Group>
    <Header as="h3" dividing>
      {formatMessage({ id: "comments.header" })}
    </Header>
    {comments.map(CommentRow)}
    <CommentsForm commentsResource={commentsResource} />
  </Comment.Group>
);

Comments.propTypes = {
  comments: PropTypes.array,
  commentsResource: PropTypes.object,
  intl: PropTypes.object
};

const mapStateToProps = state => ({
  comments: state.comments,
  commentsLoading: state.commentsLoading,
  commentsResource: state.commentsResource
});

export default compose(
  injectIntl,
  connect(mapStateToProps)
)(Comments);

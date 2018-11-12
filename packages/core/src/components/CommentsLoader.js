import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fetchComments, clearComments } from "../routines";
import { Loading } from "./Loading";

class CommentsLoader extends React.Component {
  static propTypes = {
    commentsLoading: PropTypes.bool,
    resource_id: PropTypes.number,
    resource_type: PropTypes.string,
    fetchComments: PropTypes.func,
    clearComments: PropTypes.func
  };

  componentDidMount() {
    const { resource_id, resource_type } = this.props;
    if (resource_id && resource_type) {
      this.props.fetchComments({ resource_id, resource_type });
    }
  }

  componentWillUnmount() {
    const { clearComments } = this.props;
    clearComments();
  }

  render() {
    const { commentsLoading } = this.props;
    if (commentsLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ commentsLoading }) => ({ commentsLoading });

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchComments, clearComments }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsLoader);

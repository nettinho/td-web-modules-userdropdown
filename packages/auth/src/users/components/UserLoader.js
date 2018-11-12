import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { clearUser, fetchUser } from "../routines";

class UserLoader extends React.Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired,
    clearUser: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    userLoading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { clearUser, fetchUser, match } = this.props;
    if (match) {
      const { id } = match.params;
      if (id) {
        fetchUser({ id });
      } else {
        clearUser();
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { clearUser, fetchUser, match } = this.props;
    if (match) {
      const { id } = match.params;
      if (prevProps.match.params.id !== id) {
        if (id) {
          fetchUser({ id });
        } else {
          clearUser();
        }
      }
    }
  }

  componentWillUnmount() {
    const { clearUser } = this.props;
    clearUser();
  }

  render() {
    const { userLoading } = this.props;
    return userLoading ? <Loading /> : null;
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ clearUser, fetchUser }, dispatch)
});

const mapStateToProps = ({ userLoading }) => ({ userLoading });

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UserLoader);

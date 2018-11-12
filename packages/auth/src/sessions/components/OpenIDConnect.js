import React from "react";
import PropTypes from "prop-types";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import queryString from "query-string";
import { Loading } from "@truedat/core/components";
import { openIdLogin } from "../routines";

export class OpenIDConnect extends React.Component {
  static propTypes = {
    authentication: PropTypes.object,
    authRedirect: PropTypes.string,
    location: PropTypes.object
  };

  componentDidMount() {
    const {
      location: { hash },
      openIdLogin
    } = this.props;
    const opts = queryString.parse(hash);
    openIdLogin(opts);
  }

  render() {
    const { authentication, authRedirect } = this.props;
    if (authentication && authentication.token) {
      return <Redirect to="/" />;
    }
    return authRedirect ? (
      <Redirect to={authRedirect} />
    ) : (
      <Loading size="massive" />
    );
  }
}

const mapStateToProps = ({ authentication, authRedirect }) => ({
  authentication,
  authRedirect
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ openIdLogin }, dispatch)
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(OpenIDConnect);

import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { Loading } from "@truedat/core/components";
import { auth0Login } from "../routines";
import { auth0 } from "../services";

export const CallbackOrRedirect = ({
  auth0Login,
  authentication,
  location,
  authRedirect
}) => {
  if (authentication && authentication.token) {
    return <Redirect to="/" />;
  }
  if (/access_token|id_token|error/.test(location.hash)) {
    auth0.handleAuthentication(auth0Login);
  }
  return authRedirect ? (
    <Redirect to={authRedirect} />
  ) : (
    <Loading size="massive" />
  );
};

CallbackOrRedirect.propTypes = {
  auth0Login: PropTypes.func.isRequired,
  authentication: PropTypes.object,
  location: PropTypes.object,
  authRedirect: PropTypes.string
};

const mapStateToProps = ({ authentication, authRedirect }) => ({
  authentication,
  authRedirect
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ auth0Login }, dispatch)
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(CallbackOrRedirect);

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import routes from "../routes";
import { REQUEST_TOKEN } from "../actions";

class UnauthorizedRoute extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    component: PropTypes.func,
    readTokenFromStorage: PropTypes.func
  };

  componentDidMount() {
    const { token, readTokenFromStorage } = this.props;
    if (token === undefined) {
      readTokenFromStorage();
    }
  }

  render() {
    const {
      component: Component,
      token,
      has_permissions,
      ...rest
    } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (token && !has_permissions) {
            return <Component {...props} />;
          }
          return <Redirect to={{ pathname: routes.LOGIN }} />;
        }}
      />
    );
  }
}

const mapStateToProps = ({ authentication }) => ({
  token: authentication.token,
  has_permissions: authentication.has_permissions
});

const mapDispatchToProps = dispatch => ({
  readTokenFromStorage: () => dispatch({ type: REQUEST_TOKEN })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UnauthorizedRoute);

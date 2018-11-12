import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { clearRedirect } from "../routines";

class Redirector extends React.Component {
  static propTypes = {
    redirect: PropTypes.string,
    clearRedirect: PropTypes.func
  };

  componentDidMount() {
    this.props.clearRedirect();
  }

  render() {
    const { redirect } = this.props;
    return <Redirect to={{ pathname: redirect }} />;
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ clearRedirect }, dispatch)
});

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(Redirector);

import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { fetchRoles, clearRoles } from "../routines";
import { withRouter } from "react-router-dom";

class RolesLoader extends React.Component {
  static propTypes = {
    fetchRoles: PropTypes.func,
    clearRoles: PropTypes.func,
    rolesLoading: PropTypes.bool
  };

  componentDidMount() {
    const { fetchRoles } = this.props;
    fetchRoles();
  }

  componentWillUnmount() {
    const { clearRoles } = this.props;
    clearRoles();
  }

  render() {
    const { rolesLoading } = this.props;
    if (rolesLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ rolesLoading }) => ({ rolesLoading });
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchRoles, clearRoles }, dispatch)
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RolesLoader);

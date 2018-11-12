import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Loading } from "@truedat/core/components";
import { fetchPermissions, fetchRole, fetchRolePermissions, clearRoles } from "../routines";

class RoleLoader extends React.Component {
  static propTypes = {
    fetchPermissions: PropTypes.func,
    fetchRole: PropTypes.func,
    fetchRolePermissions: PropTypes.func,
    roleLoading: PropTypes.bool,
    match: PropTypes.object
  };

  componentDidMount() {
    const {
      fetchPermissions,
      fetchRole,
      fetchRolePermissions,
      match
    } = this.props;
    const { id } = match.params;
    if (id) {
      fetchPermissions();
      fetchRole({ id });
      fetchRolePermissions({ id });
    }
  }

  render() {
    const { roleLoading } = this.props;
    if (roleLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ roleLoading }) => ({ roleLoading });
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    { fetchPermissions, fetchRole, fetchRolePermissions, clearRoles },
    dispatch
  )
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RoleLoader);

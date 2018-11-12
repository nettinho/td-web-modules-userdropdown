import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { hideSidebar } from "@truedat/core/routines";
import { ActiveRoute } from "@truedat/core/components/ActiveRoute";
import routes from "../routes";
import groupRoutes from "../../groups/routes";

export const UserMenuItem = ({ location }) => (
  <Menu.Item
    as={Link}
    to={routes.USER_LIST}
    name="users"
    active={
      ActiveRoute(location, routes.USER_LIST) ||
      ActiveRoute(location, groupRoutes.GROUP_LIST)
    }
  >
    <Icon name="users" />
    <FormattedMessage id="navigation.admin.users" />
  </Menu.Item>
);

UserMenuItem.propTypes = {
  location: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ hideSidebar }, dispatch)
});

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(UserMenuItem);

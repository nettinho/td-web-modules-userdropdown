import React from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { Icon, Menu } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import { ActiveRoute } from "@truedat/core/components/ActiveRoute";
import UserMenuItem from "../users/components/UserMenuItem";
import RolesMenuItem from "../roles/components/RolesMenuItem";
import roleRoutes from "../roles/routes";
import userRoutes from "../users/routes";
import groupRoutes from "../groups/routes";
import AdminRole from "./AdminRole";
export const AdminMenu = ({ location }) => (
  <Menu.Item
    header
    name="administration"
    active={
      ActiveRoute(location, roleRoutes.ROLES) ||
      ActiveRoute(location, userRoutes.USER_LIST) ||
      ActiveRoute(location, groupRoutes.GROUP_LIST)
    }
  >
    <Icon name="setting" />
    <FormattedMessage id="navigation.admin" />
    <Menu.Menu>
      <UserMenuItem />
      <RolesMenuItem />
    </Menu.Menu>
  </Menu.Item>
);

AdminMenu.propTypes = {
  location: PropTypes.object
};

export default compose(
  withRouter,
  AdminRole
)(AdminMenu);

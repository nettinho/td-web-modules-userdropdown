import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { ActiveRoute } from "@truedat/core/components/ActiveRoute";
import routes from "../routes";

export const RolesMenuItem = ({ location }) => (
  <Menu.Item
    as={Link}
    to={routes.ROLES}
    name="roles"
    active={ActiveRoute(location, routes.ROLES)}
  >
    <Icon name="student" />
    <FormattedMessage id="navigation.admin.roles" />
  </Menu.Item>
);

RolesMenuItem.propTypes = {
  location: PropTypes.object
};

export default withRouter(RolesMenuItem);

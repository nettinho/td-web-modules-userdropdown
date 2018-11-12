import React from "react";
import { Menu } from "semantic-ui-react";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import routes from "../routes";
import groupRoutes from "../../groups/routes";

const UserTabs = ({ match, intl: { formatMessage } }) => (
  <Menu attached="top" secondary pointing tabular>
    <Menu.Item
      name={formatMessage({ id: "tabs.users" })}
      active={match.path === "/users"}
      as={Link}
      to={routes.USER_LIST}
    />
    <Menu.Item
      name={formatMessage({ id: "tabs.groups" })}
      active={match.path === "/groups"}
      as={Link}
      to={groupRoutes.GROUP_LIST}
    />
  </Menu>
);

UserTabs.propTypes = {
  intl: PropTypes.object,
  match: PropTypes.object
};

export default compose(
  withRouter,
  injectIntl
)(UserTabs);

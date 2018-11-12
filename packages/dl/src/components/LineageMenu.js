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

export const LineageMenu = ({ hideSidebar, location }) => (
  <Menu.Item
    header
    name="lineage"
    active={ActiveRoute(location, routes.LINEAGE)}
  >
    <Icon name="share alternate" />
    <FormattedMessage id="navigation.lineage" />
    <Menu.Menu>
      <Menu.Item
        as={Link}
        to={routes.LINEAGE}
        name="lineage_search"
        onClick={hideSidebar}
        active={ActiveRoute(location, routes.LINEAGE)}
      >
        <Icon name="search" />
        <FormattedMessage id="navigation.lineage.search" />
      </Menu.Item>
    </Menu.Menu>
  </Menu.Item>
);

LineageMenu.propTypes = {
  hideSidebar: PropTypes.func,
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
)(LineageMenu);

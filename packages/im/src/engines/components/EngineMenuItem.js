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

export const EngineMenuItem = ({ location }) => (
  <Menu.Item
    as={Link}
    to={routes.ENGINES}
    name="engine"
    active={ActiveRoute(location, routes.ENGINES)}
  >
    <FormattedMessage id="navigation.intakes.engines" />
  </Menu.Item>
);

EngineMenuItem.propTypes = {
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
)(EngineMenuItem);

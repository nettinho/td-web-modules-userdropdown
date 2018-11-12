import React from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { Icon, Menu } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router-dom";
import { ActiveRoute } from "@truedat/core/components/ActiveRoute";
import AdminRole from "@truedat/auth/components/AdminRole";
import EngineMenuItem from "../engines/components/EngineMenuItem";
import engineRoutes from "../engines/routes";

export const IntakeMenu = ({ location }) => (
  <Menu.Item
    header
    name="intakes"
    active={ActiveRoute(location, engineRoutes.ENGINES)}
  >
    <Icon name="upload" />
    <FormattedMessage id="navigation.intakes" default="añsdjfañlskdjf" />
    <Menu.Menu>
      <EngineMenuItem />
    </Menu.Menu>
  </Menu.Item>
);

IntakeMenu.propTypes = {
  location: PropTypes.object
};

export default compose(
  withRouter,
  AdminRole
)(IntakeMenu);

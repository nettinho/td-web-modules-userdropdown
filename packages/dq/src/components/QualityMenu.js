import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";
import { compose } from "redux";
import { FormattedMessage } from "react-intl";
import { hideSidebar } from "@truedat/core/routines";
import { ActiveRoute } from "@truedat/core/components/ActiveRoute";
import qualityRoutes from "../routes";

export const QualityMenu = ({ location }) => (
  <Menu.Item
    header
    name="quality"
    active={ActiveRoute(location, qualityRoutes.RULES)}
  >
    <Icon name="check" />
    <FormattedMessage id="navigation.quality" />
    <Menu.Menu>
      <Menu.Item
        as={Link}
        to={qualityRoutes.RULES}
        name="quality"
        onClick={hideSidebar}
        active={ActiveRoute(location, qualityRoutes.RULES)}
      >
        <FormattedMessage id="navigation.quality.rules" />
      </Menu.Item>
    </Menu.Menu>
  </Menu.Item>
);

QualityMenu.propTypes = {
  location: PropTypes.object
};

export default compose(withRouter)(QualityMenu);

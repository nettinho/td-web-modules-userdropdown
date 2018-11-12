import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { injectIntl } from "react-intl";
import routes from "../routes";

const items = [{ message: "tabs.domains", path: routes.DOMAINS }];

export const DomainsTabs = ({ intl: { formatMessage }, match }) => (
  <Menu attached="top" pointing secondary tabular>
    {items.map(({ message, path }, i) => (
      <Menu.Item
        key={i}
        name={formatMessage({ id: message })}
        as={Link}
        to={path}
        active={match.path === path}
      />
    ))}
  </Menu>
);

DomainsTabs.propTypes = {
  intl: PropTypes.object,
  match: PropTypes.object
};

export default compose(
  withRouter,
  injectIntl
)(DomainsTabs);

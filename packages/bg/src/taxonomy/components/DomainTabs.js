import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import routes, { linkTo } from "../routes";

const toShowPath = linkTo.DOMAIN;
const toActionPath = linkTo.DOMAIN_ACTION;

const DomainTabs = ({ intl: { formatMessage }, domain, match }) => (
  <Menu attached="top" pointing secondary tabular>
    <Menu.Item
      name={formatMessage({ id: "tabs.subdomains" })}
      active={match.path === routes.DOMAIN}
      as={Link}
      to={toShowPath(domain)}
      replace
    />
    <Menu.Item
      name={formatMessage({ id: "tabs.members" })}
      active={match.path === routes.DOMAIN_MEMBERS}
      as={Link}
      to={toActionPath({ action: "members", ...domain })}
      replace
    />
  </Menu>
);

DomainTabs.propTypes = {
  intl: PropTypes.object,
  domain: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = ({ domain }) => ({ domain });

export default compose(
  withRouter,
  injectIntl,
  connect(mapStateToProps)
)(DomainTabs);

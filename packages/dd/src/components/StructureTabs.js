import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import routes, { linkTo } from "../routes";

const toShowPath = linkTo.STRUCTURE;
const toActionPath = linkTo.EVENTS;

const StructureTabs = ({ intl: { formatMessage }, structure, match }) => (
  <Menu attached="top" secondary pointing tabular>
    <Menu.Item
      name={formatMessage({ id: "tabs.dd.fields" })}
      active={match.path === routes.STRUCTURE}
      as={Link}
      to={toShowPath(structure)}
      replace
    />
    <Menu.Item
      name={formatMessage({ id: "tabs.dd.audit" })}
      active={match.path === routes.EVENTS}
      as={Link}
      to={toActionPath(structure)}
      replace
    />
  </Menu>
);

StructureTabs.propTypes = {
  intl: PropTypes.object,
  structure: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = ({ structure }) => ({ structure });

export default compose(
  withRouter,
  injectIntl,
  connect(mapStateToProps)
)(StructureTabs);

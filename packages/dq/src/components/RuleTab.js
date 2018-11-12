import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";

const RuleTab = ({ concept, formatMessage, routes, match, linkTo }) => (
  <Menu.Item
    name={formatMessage({ id: "tabs.bg.qualityRules" })}
    active={match.path === routes.CONCEPT_RULES}
    as={Link}
    to={linkTo.CONCEPT_RULES(concept)}
    replace
  />
);

RuleTab.propTypes = {
  formatMessage: PropTypes.func,
  routes: PropTypes.object,
  concept: PropTypes.object,
  linkTo: PropTypes.object
};

export default RuleTab;

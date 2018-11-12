import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Menu } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Loading } from "@truedat/core/components";
import Loadable from "react-loadable";
import routes, { linkTo } from "../routes";

const RuleTab = Loadable({
  loader: () => import("@truedat/dq/components/RuleTab"),
  loading: Loading
});

const ConceptTabs = ({ intl: { formatMessage }, concept, match }) =>
  _.isEmpty(concept) ? null : (
    <Menu attached="top" pointing secondary tabular>
      <Menu.Item
        name={formatMessage({ id: "tabs.bg.concept" })}
        active={match.path === routes.CONCEPT}
        as={Link}
        to={linkTo.CONCEPT(concept)}
        replace
      />
      <Menu.Item
        name={formatMessage({ id: "tabs.bg.link_manager" })}
        active={
          match.path === routes.CONCEPT_DATA ||
          match.path === routes.CONCEPT_DATA_NEW
        }
        as={Link}
        to={linkTo.CONCEPT_DATA(concept)}
        replace
      />
      <RuleTab
        concept={concept}
        formatMessage={formatMessage}
        routes={routes}
        match={match}
        linkTo={linkTo}
      />
      <Menu.Item
        name={formatMessage({ id: "tabs.bg.history" })}
        active={match.path === routes.CONCEPT_ARCHIVE}
        as={Link}
        to={linkTo.CONCEPT_ARCHIVE(concept)}
        replace
      />
      <Menu.Item
        name={formatMessage({ id: "tabs.bg.audit" })}
        active={match.path === routes.CONCEPT_EVENTS}
        as={Link}
        to={linkTo.CONCEPT_EVENTS(concept)}
        replace
      />
    </Menu>
  );

ConceptTabs.propTypes = {
  intl: PropTypes.object,
  concept: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = ({ concept }) => ({ concept });

export default compose(
  withRouter,
  injectIntl,
  connect(mapStateToProps)
)(ConceptTabs);

import React from "react";
import PropTypes from "prop-types";
import { Menu, Divider } from "semantic-ui-react";
import { withRouter, Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

import routes, { linkTo } from "../routes";

const ConceptTabs = ({ intl: { formatMessage }, match: { path } }) => (
  <React.Fragment>
    <Menu attached="top" pointing secondary tabular>
      <Menu.Item
        name={formatMessage({ id: "concepts.tabs.published" })}
        active={path === routes.CONCEPTS}
        as={Link}
        to={linkTo.CONCEPTS()}
        replace
      />
      <Menu.Item
        name={formatMessage({ id: "concepts.tabs.pending" })}
        active={path === routes.CONCEPTS_PENDING}
        as={Link}
        to={linkTo.CONCEPTS_PENDING()}
        replace
      />
    </Menu>
    <Divider hidden />
  </React.Fragment>
);

ConceptTabs.propTypes = {
  intl: PropTypes.object,
  match: PropTypes.object
};

const mapStateToProps = ({ conceptQuery: { filters } }) => ({
  activeFilters: filters
});

export default compose(
  withRouter,
  injectIntl,
  connect(mapStateToProps)
)(ConceptTabs);

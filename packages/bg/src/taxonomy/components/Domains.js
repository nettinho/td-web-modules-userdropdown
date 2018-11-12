import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Route, Switch, withRouter } from "react-router-dom";
import { Header, Icon, Segment } from "semantic-ui-react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import routes from "../routes";
import { createDomain } from "../routines";
import DomainCards from "./DomainCards";
import DomainForm from "./DomainForm";
import DomainsActions from "./DomainsActions";

export const Domains = ({ domainsLoading, createDomain }) => {
  return (
    <Fragment>
      <Segment>
        <Header as="h2">
          <Icon circular name="sitemap" />
          <Header.Content>
            <FormattedMessage id="navigation.glossary.taxonomy" />
            <Header.Subheader>
              <FormattedMessage id="domains.subheader" />
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Segment attached="bottom" loading={domainsLoading}>
          <DomainsActions />
          <Switch>
            <Route path={routes.DOMAINS} component={DomainCards} exact />
            <Route path={routes.DOMAINS_NEW} exact>
              <DomainForm handleSubmit={createDomain} />
            </Route>
          </Switch>
        </Segment>
      </Segment>
    </Fragment>
  );
};

Domains.propTypes = {
  domainsLoading: PropTypes.bool,
  createDomain: PropTypes.func.isRequired
};

const mapStateToProps = ({ domainsLoading }) => ({
  domainsLoading
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ createDomain }, dispatch)
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Domains);

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import routes, { linkTo } from "../routes";
import DomainActions from "./DomainActions";
import DomainCrumbs from "./DomainCrumbs";
import DomainCards from "./DomainCards";
import DomainDetail from "./DomainDetail";
import DomainMembers from "./DomainMembers";
import DomainSearch from "./DomainSearch";
import DomainTabs from "./DomainTabs";

const toActionPath = linkTo.DOMAIN_ACTION;

export const Domain = ({ domain, domainLoading }) => {
  const available_actions = {
    create: {
      order: 1,
      icon: "cube",
      messageId: "domain.actions.create",
      action: id => toActionPath({ action: "new", id })
    }
  };

  return domainLoading ? null : domain && domain.id ? (
    <Fragment>
      <DomainCrumbs />
      <Segment>
        <DomainDetail />
        <DomainTabs />
        <Segment attached="bottom">
          <Switch>
            <Route path={routes.DOMAIN} exact>
              <Fragment>
                <DomainSearch />
                <DomainActions availableActions={available_actions} />
                <DomainCards />
              </Fragment>
            </Route>
            <Route
              path={routes.DOMAIN_MEMBERS}
              component={DomainMembers}
              exact
            />
          </Switch>
        </Segment>
      </Segment>
    </Fragment>
  ) : null;
};

Domain.propTypes = {
  domain: PropTypes.object
};

const mapStateToProps = ({ domain, domainLoading }) => ({
  domain,
  domainLoading
});

export default connect(mapStateToProps)(Domain);

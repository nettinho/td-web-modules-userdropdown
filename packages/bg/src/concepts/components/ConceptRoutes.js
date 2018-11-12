import _ from "lodash/fp";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter, Route, Switch } from "react-router-dom";
import Comments from "@truedat/core/components/Comments";
import { Segment, Grid } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import Loadable from "react-loadable";
import { Loading } from "@truedat/core/components";
import routes from "../routes";

const Concepts = Loadable({
  loader: () => import("./Concepts"),
  loading: Loading
});

const ConceptsLoader = Loadable({
  loader: () => import("./ConceptsLoader"),
  loading: Loading
});

const Concept = Loadable({
  loader: () => import("./Concept"),
  loading: Loading
});

const ConceptEdit = Loadable({
  loader: () => import("./ConceptEdit"),
  loading: Loading
});

const ConceptFiltersLoader = Loadable({
  loader: () => import("./ConceptFiltersLoader"),
  loading: Loading
});

const ConceptLoader = Loadable({
  loader: () => import("./ConceptLoader"),
  loading: Loading
});

const ConceptLinksLoader = Loadable({
  loader: () => import("./ConceptLinksLoader"),
  loading: Loading
});

const ConceptLinks = Loadable({
  loader: () => import("./ConceptLinks"),
  loading: Loading
});

const ConceptLinkFormLoader = Loadable({
  loader: () => import("./ConceptLinkFormLoader"),
  loading: Loading
});

const ConceptLinkForm = Loadable({
  loader: () => import("./ConceptLinkForm"),
  loading: Loading
});

const EventsLoader = Loadable({
  loader: () => import("./EventsLoader"),
  loading: Loading
});

const Events = Loadable({
  loader: () => import("./Events"),
  loading: Loading
});

const ConceptArchiveLoader = Loadable({
  loader: () => import("./ConceptArchiveLoader"),
  loading: Loading
});

const ConceptArchive = Loadable({
  loader: () => import("./ConceptArchive"),
  loading: Loading
});

const ConceptRules = Loadable({
  loader: () => import("@truedat/dq/components/ConceptRules"),
  loading: Loading
});

const ConceptRulesLoader = Loadable({
  loader: () => import("@truedat/dq/components/ConceptRulesLoader"),
  loading: Loading
});

const RulesLoader = Loadable({
  loader: () => import("@truedat/dq/components/RulesLoader"),
  loading: Loading
});

const ConceptDetails = Loadable({
  loader: () => import("./ConceptDetails"),
  loading: Loading
});

const DomainsLoader = Loadable({
  loader: () => import("../../taxonomy/components/DomainsLoader"),
  loading: Loading
});

const ConceptCrumbs = Loadable({
  loader: () => import("./ConceptCrumbs"),
  loading: Loading
});

const ConceptForm = Loadable({
  loader: () => import("./ConceptForm"),
  loading: Loading
});

const RuleTypesLoader = Loadable({
  loader: () => import("@truedat/dq/components/RuleTypesLoader"),
  loading: Loading
});

const NewRule = Loadable({
  loader: () => import("@truedat/dq/components/NewRule"),
  loading: Loading
});

const CommentsLoader = Loadable({
  loader: () => import("@truedat/core/components/CommentsLoader"),
  loading: Loading
});

const ConceptSummary = Loadable({
  loader: () => import("./ConceptSummary"),
  loading: Loading
});

const ConceptHierarchy = Loadable({
  loader: () => import("./ConceptHierarchy"),
  loading: Loading
});

const ConceptMetrics = Loadable({
  loader: () => import("./ConceptMetrics"),
  loading: Loading
});

const ConceptRoutes = ({ conceptLoaded, concept_id }) => (
  <Route path={routes.CONCEPTS}>
    <Fragment>
      <Route exact path={routes.CONCEPTS} component={ConceptsLoader} />
      <Route exact path={routes.CONCEPTS} component={ConceptFiltersLoader} />
      <Route exact path={routes.CONCEPTS} component={Concepts} />

      <Route exact path={routes.CONCEPTS_PENDING} component={ConceptsLoader} />
      <Route
        exact
        path={routes.CONCEPTS_PENDING}
        component={ConceptFiltersLoader}
      />
      <Route exact path={routes.CONCEPTS_PENDING} component={Concepts} />
      <Switch>
        <Route exact path={routes.RULE_NEW}>
          <Fragment>
            <ConceptCrumbs />
            <ConceptLoader />
            <RulesLoader />
            <RuleTypesLoader />
            {conceptLoaded && <NewRule />}
          </Fragment>
        </Route>
        <Route exact path={routes.CONCEPTS_NEW}>
          <Fragment>
            <DomainsLoader actions="create_business_concept" />
            <ConceptCrumbs conceptAction="concepts.actions.create" />
            <ConceptsLoader />
            <ConceptForm />
          </Fragment>
        </Route>
        <Route exact path={routes.CONCEPT}>
          <Fragment>
            <ConceptCrumbs />
            <Grid columns="equal" style={{ marginTop: 0 }}>
              <Grid.Column width={12}>
                <Segment>
                  <ConceptLoader />
                  {conceptLoaded && <Concept />}
                  {conceptLoaded && <ConceptDetails />}
                  {conceptLoaded && (
                    <CommentsLoader
                      resource_id={concept_id}
                      resource_type={"business_concept"}
                    />
                  )}
                </Segment>
                <Segment>{conceptLoaded && <Comments />}</Segment>
              </Grid.Column>
              <Grid.Column width={4}>
                {conceptLoaded && <ConceptSummary />}
                {conceptLoaded && <ConceptHierarchy />}
                {conceptLoaded && <ConceptMetrics />}
              </Grid.Column>
            </Grid>
          </Fragment>
        </Route>
        <Route exact path={routes.CONCEPT_ARCHIVE}>
          <Fragment>
            <ConceptCrumbs />
            <Grid columns="equal" style={{ marginTop: 0 }}>
              <Grid.Column width={12}>
                <Segment>
                  <ConceptLoader />
                  <ConceptArchiveLoader />
                  {conceptLoaded && <Concept />}
                  {conceptLoaded && <ConceptArchive />}
                </Segment>
              </Grid.Column>
              <Grid.Column width={4}>
                {conceptLoaded && <ConceptSummary />}
                {conceptLoaded && <ConceptHierarchy />}
                {conceptLoaded && <ConceptMetrics />}
              </Grid.Column>
            </Grid>
          </Fragment>
        </Route>
        <Route exact path={routes.CONCEPT_EVENTS}>
          <Fragment>
            <ConceptCrumbs />
            <Grid columns="equal" style={{ marginTop: 0 }}>
              <Grid.Column width={12}>
                <Segment>
                  <ConceptLoader />
                  <ConceptArchiveLoader />
                  {conceptLoaded && <EventsLoader resource_id={concept_id} />}
                  {conceptLoaded && <Concept />}
                  {conceptLoaded && <Events />}
                </Segment>
              </Grid.Column>
              <Grid.Column width={4}>
                {conceptLoaded && <ConceptSummary />}
                {conceptLoaded && <ConceptHierarchy />}
                {conceptLoaded && <ConceptMetrics />}
              </Grid.Column>
            </Grid>
          </Fragment>
        </Route>
        <Route exact path={routes.CONCEPT_DATA}>
          <Fragment>
            <ConceptCrumbs />
            <Grid columns="equal" style={{ marginTop: 0 }}>
              <Grid.Column width={12}>
                <Segment>
                  <ConceptLoader />
                  {conceptLoaded && (
                    <ConceptLinksLoader
                      resource_id={concept_id}
                      resource_type={"business_concept"}
                    />
                  )}
                  {conceptLoaded && <Concept />}
                  {conceptLoaded && <ConceptLinks />}
                </Segment>
              </Grid.Column>
              <Grid.Column width={4}>
                {conceptLoaded && <ConceptSummary />}
                {conceptLoaded && <ConceptHierarchy />}
                {conceptLoaded && <ConceptMetrics />}
              </Grid.Column>
            </Grid>
          </Fragment>
        </Route>
        <Route exact path={routes.CONCEPT_DATA_NEW}>
          <Fragment>
            <ConceptCrumbs />
            <Segment>
              <ConceptLoader />
              <ConceptLinkFormLoader />
              {conceptLoaded && <Concept />}
              {conceptLoaded && (
                <ConceptLinkForm resource_type={"business_concept"} />
              )}
            </Segment>
          </Fragment>
        </Route>
        <Route exact path={routes.CONCEPT_RULES}>
          <Fragment>
            <ConceptCrumbs />
            <Grid columns="equal" style={{ marginTop: 0 }}>
              <Grid.Column width={12}>
                <Segment>
                  <ConceptLoader />
                  {conceptLoaded && <ConceptRulesLoader />}
                  {conceptLoaded && <Concept />}
                  {conceptLoaded && <ConceptRules />}
                </Segment>
              </Grid.Column>
              <Grid.Column width={4}>
                {conceptLoaded && <ConceptSummary />}
                {conceptLoaded && <ConceptHierarchy />}
                {conceptLoaded && <ConceptMetrics />}
              </Grid.Column>
            </Grid>
          </Fragment>
        </Route>
        <Route exact path={routes.CONCEPT_EDIT}>
          <Fragment>
            <ConceptCrumbs conceptAction="concepts.actions.edit" />
            <ConceptLoader />
            {conceptLoaded && <ConceptEdit />}
          </Fragment>
        </Route>
      </Switch>
    </Fragment>
  </Route>
);

ConceptRoutes.propTypes = {
  conceptLoaded: PropTypes.bool,
  concept_id: PropTypes.number
};

const mapStateToProps = ({ concept }) => ({
  conceptLoaded: !_.isEmpty(concept),
  concept_id: !_.isEmpty(concept) ? concept.business_concept_id : undefined
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ConceptRoutes);

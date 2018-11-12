import React, { Fragment } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import { Loading } from "@truedat/core/components";
import routes from "../routes";

const RulesLoader = Loadable({
  loader: () => import("./RulesLoader"),
  loading: Loading
});

const Rules = Loadable({
  loader: () => import("./Rules"),
  loading: Loading
});

const Rule = Loadable({
  loader: () => import("./Rule"),
  loading: Loading
});

const RuleLoader = Loadable({
  loader: () => import("./RuleLoader"),
  loading: Loading
});

const EditRule = Loadable({
  loader: () => import("./EditRule"),
  loading: Loading
});

const NewRule = Loadable({
  loader: () => import("./NewRule"),
  loading: Loading
});

const RuleTypesLoader = Loadable({
  loader: () => import("./RuleTypesLoader"),
  loading: Loading
});

const NewRuleImplementation = Loadable({
  loader: () => import("./NewRuleImplementation"),
  loading: Loading
});

const RuleImplementationsLoader = Loadable({
  loader: () => import("./RuleImplementationsLoader"),
  loading: Loading
});

const QualityRoutes = () => (
  <Fragment>
    <Route path={routes.RULES}>
      <Fragment>
        <Route path={routes.RULES} component={RulesLoader} />
        <Route path={routes.RULES} component={Rules} exact />
        <Switch>
          <Route exact path={routes.RULE_NEW}>
            <Fragment>
              <RuleTypesLoader />
              <NewRule />
            </Fragment>
          </Route>
          <Route exact path={routes.RULE}>
            <Fragment>
              <RuleLoader />
              <RuleImplementationsLoader />
              <Rule />
            </Fragment>
          </Route>
          <Route exact path={routes.RULE_IMPLEMENTATION_NEW}>
            <Fragment>
              <RuleTypesLoader />
              <RuleLoader />
              <NewRuleImplementation />
            </Fragment>
          </Route>
          <Route exact path={routes.RULE_EDIT}>
            <Fragment>
              <RuleTypesLoader />
              <RuleLoader />
              <EditRule />
            </Fragment>
          </Route>
        </Switch>
      </Fragment>
    </Route>
  </Fragment>
);

export default withRouter(QualityRoutes);

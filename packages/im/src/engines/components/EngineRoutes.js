import React, { Fragment } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import { Loading } from "@truedat/core/components";
import routes from "../routes";

const DatalakesLoader = Loadable({
  loader: () => import("./DatalakesLoader"),
  loading: Loading
});

const EnginesLoader = Loadable({
  loader: () => import("./EnginesLoader"),
  loading: Loading
});

const Engines = Loadable({
  loader: () => import("./Engines"),
  loading: Loading
});

const NewEngine = Loadable({
  loader: () => import("./NewEngine"),
  loading: Loading
});

const EngineRoutes = () => (
  <Fragment>
    <Route path={routes.ENGINES}>
      <Fragment>
        <Route path={routes.ENGINES} component={EnginesLoader} />
        <Route path={routes.ENGINES} component={Engines} exact />
        <Switch>
          <Route exact path={routes.ENGINE_NEW}>
            <Fragment>
              <DatalakesLoader />
              <NewEngine />
            </Fragment>
          </Route>
        </Switch>
      </Fragment>
    </Route>
  </Fragment>
);

export default withRouter(EngineRoutes);

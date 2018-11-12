import React, { Fragment } from "react";
import { withRouter, Route } from "react-router-dom";
import Loadable from "react-loadable";
import { Loading } from "@truedat/core/components";
import routes from "../routes";

const Lineage = Loadable({
  loader: () => import("./Lineage"),
  loading: Loading
});

const LineageVisualization = Loadable({
  loader: () => import("./LineageVisualization"),
  loading: Loading
});

const LineageTree = Loadable({
  loader: () => import("./LineageTree"),
  loading: Loading
});

const PathsLoader = Loadable({
  loader: () => import("./PathsLoader"),
  loading: Loading
});

const LineageRoutes = () => (
  <Fragment>
    <Route path={routes.LINEAGE} component={Lineage} exact />
    <Route path={routes.LINEAGE_VISUALIZATION} component={PathsLoader} />
    <Route path={routes.LINEAGE_VISUALIZATION} component={LineageTree} />
    <Route path={routes.LINEAGE_VIS} component={LineageVisualization} />
  </Fragment>
);

export default withRouter(LineageRoutes);

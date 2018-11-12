import React, { Fragment } from "react";
import { withRouter, Route } from "react-router-dom";
import Loadable from "react-loadable";
import { Loading } from "@truedat/core/components";
import routes from "../routes";

const EventsLoader = Loadable({
  loader: () => import("./EventsLoader"),
  loading: Loading
});

const StructuresLoader = Loadable({
  loader: () => import("./StructuresLoader"),
  loading: Loading
});

const StructureLoader = Loadable({
  loader: () => import("./StructureLoader"),
  loading: Loading
});

const Structures = Loadable({
  loader: () => import("./Structures"),
  loading: Loading
});

const StructureRoutes = Loadable({
  loader: () => import("./StructureRoutes"),
  loading: Loading
});

const StructureField = Loadable({
  loader: () => import("./StructureField"),
  loading: Loading
});

const StructureFieldLoader = Loadable({
  loader: () => import("./StructureFieldLoader"),
  loading: Loading
});

const StructureCrumbs = Loadable({
  loader: () => import("./StructureCrumbs"),
  loading: Loading
});

const StructureFiltersLoader = Loadable({
  loader: () => import("./StructureFiltersLoader"),
  loading: Loading
});

const DictionaryRoutes = () => (
  <Fragment>
    <Route path={routes.STRUCTURES}>
      <Fragment>
        <Route path={routes.STRUCTURES} component={StructuresLoader} />
        <Route path={routes.STRUCTURES} component={Structures} exact />
        <Route
          path={routes.STRUCTURES}
          component={StructureFiltersLoader}
          exact
        />
        <Route path={routes.STRUCTURE} component={StructureLoader} />
        <Route path={routes.STRUCTURE} component={EventsLoader} />
        <Route path={routes.STRUCTURE} component={StructureCrumbs} />
        <Route path={routes.STRUCTURE} component={StructureRoutes} exact />
        <Route path={routes.EVENTS} component={StructureRoutes} exact />
        <Route path={routes.STRUCTURE_FIELD} component={StructureFieldLoader} />
        <Route path={routes.STRUCTURE_FIELD} component={StructureField} exact />
      </Fragment>
    </Route>
  </Fragment>
);

export default withRouter(DictionaryRoutes);

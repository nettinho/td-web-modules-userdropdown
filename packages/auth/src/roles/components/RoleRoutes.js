import React, { Fragment } from "react";
import { compose } from "redux";
import { withRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import { Loading } from "@truedat/core/components";
import routes from "../routes";
import AdminRole from "../../components/AdminRole";
import { NewRole } from ".";

const Roles = Loadable({
  loader: () => import("./Roles"),
  loading: Loading
});

const Role = Loadable({
  loader: () => import("./Role"),
  loading: Loading
});

const RolesLoader = Loadable({
  loader: () => import("./RolesLoader"),
  loading: Loading
});

const RoleLoader = Loadable({
  loader: () => import("./RoleLoader"),
  loading: Loading
});

export const RoleRoutes = () => (
  <Route path={routes.ROLES}>
    <Fragment>
      <Route path={routes.ROLES} component={RolesLoader} exact/>
      <Route path={routes.ROLES} component={Roles} exact />
      <Switch>
        <Route path={routes.ROLES_NEW} component={NewRole} exact />
        <Route path={routes.ROLE}>
          <Fragment>
            <RoleLoader />
            <Role />
          </Fragment>
        </Route>
      </Switch>
    </Fragment>
  </Route>
);

export default compose(
  withRouter,
  AdminRole
)(RoleRoutes);

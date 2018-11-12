import React, { Fragment } from "react";
import { compose } from "redux";
import { withRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import { Loading } from "@truedat/core/components";
import routes from "../routes";
import groupRoutes from "../../groups/routes";
import AdminRole from "../../components/AdminRole";

const User = Loadable({
  loader: () => import("./User"),
  loading: Loading
});

const Users = Loadable({
  loader: () => import("./Users"),
  loading: Loading
});

const NewUser = Loadable({
  loader: () => import("./NewUser"),
  loading: Loading
});

const EditUser = Loadable({
  loader: () => import("./EditUser"),
  loading: Loading
});

export const UsersLoader = Loadable({
  loader: () => import("./UsersLoader"),
  loading: Loading
});

export const GroupsLoader = Loadable({
  loader: () => import("../../groups/components/GroupsLoader"),
  loading: Loading
});

const GroupLoader = Loadable({
  loader: () => import("../../groups/components/GroupLoader"),
  loading: Loading
});

const NewGroup = Loadable({
  loader: () => import("../../groups/components/NewGroup"),
  loading: Loading
});

const EditGroup = Loadable({
  loader: () => import("../../groups/components/EditGroup"),
  loading: Loading
});

export const RolesLoader = Loadable({
  loader: () => import("../../roles/components/RolesLoader"),
  loading: Loading
});

const UserLoader = Loadable({
  loader: () => import("./UserLoader"),
  loading: Loading
});

export const UserRoutes = () => (
  <Route path={routes.USER_LIST}>
    <Fragment>
      <Route path={routes.USER_LIST} component={UsersLoader} />
      <Route path={routes.USER_LIST} component={GroupsLoader} />
      <Route path={routes.USER_LIST} component={Users} exact />
      <Switch>
        <Route exact path={routes.USER_CREATE}>
          <Fragment>
            <NewUser />
          </Fragment>
        </Route>
        <Route exact path={routes.USER}>
          <Fragment>
            <UserLoader />
            <User />
          </Fragment>
        </Route>
        <Route exact path={routes.USER_EDIT}>
          <Fragment>
            <UserLoader />
            <EditUser />
          </Fragment>
        </Route>
      </Switch>
      <Route path={groupRoutes.GROUP_LIST} component={GroupsLoader} />
      <Route path={groupRoutes.GROUP_LIST} component={Users} exact />
      <Route path={groupRoutes.GROUP_CREATE} component={NewGroup} />
      <Route path={groupRoutes.GROUP_EDIT} component={GroupLoader} />
      <Route path={groupRoutes.GROUP_EDIT} component={EditGroup} />
    </Fragment>
  </Route>
);

export default compose(
  withRouter,
  AdminRole
)(UserRoutes);

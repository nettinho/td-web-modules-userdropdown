import React, { Fragment } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import Loadable from "react-loadable";
import { Loading } from "@truedat/core/components";
import routes from "../routes";

const DomainsLoader = Loadable({
  loader: () => import("./DomainsLoader"),
  loading: Loading
});

const DomainLoader = Loadable({
  loader: () => import("./DomainLoader"),
  loading: Loading
});

const DomainMembersLoader = Loadable({
  loader: () => import("./DomainMembersLoader"),
  loading: Loading
});

const Domains = Loadable({
  loader: () => import("./Domains"),
  loading: Loading
});

const Domain = Loadable({
  loader: () => import("./Domain"),
  loading: Loading
});

const EditDomain = Loadable({
  loader: () => import("./EditDomain"),
  loading: Loading
});

const NewDomain = Loadable({
  loader: () => import("./NewDomain"),
  loading: Loading
});

const AddDomainMember = Loadable({
  loader: () => import("./AddMember"),
  loading: Loading
});

const GroupsLoader = Loadable({
  loader: () => import("@truedat/auth/groups/components/GroupsLoader"),
  loading: Loading
});

const RolesLoader = Loadable({
  loader: () => import("@truedat/auth/roles/components/RolesLoader"),
  loading: Loading
});

const UsersLoader = Loadable({
  loader: () => import("@truedat/auth/users/components/UsersLoader"),
  loading: Loading
});

const DomainRoutes = () => (
  <Route path={routes.DOMAINS}>
    <Fragment>
      <Route component={DomainsLoader} />
      <Route path={routes.DOMAINS} component={Domains} exact />
      <Switch>
        <Route path={routes.DOMAINS_SEARCH} component={Domains} exact />
        <Route path={routes.DOMAINS_NEW} component={NewDomain} exact />
        <Route path={routes.DOMAIN}>
          <Fragment>
            <Route component={DomainLoader} />
            <Route component={DomainMembersLoader} />
            <Route path={routes.DOMAIN} component={Domain} exact />
            <Route path={routes.DOMAIN_MEMBERS} component={Domain} exact />
            <Route path={routes.DOMAIN_EDIT} component={EditDomain} exact />
            <Route path={routes.DOMAIN_NEW} component={NewDomain} exact />
            <Route path={routes.DOMAIN_MEMBERS_NEW}>
              <Fragment>
                <Route component={RolesLoader} />
                <Route component={UsersLoader} />
                <Route component={GroupsLoader} />
                <Route
                  path={routes.DOMAIN_MEMBERS_NEW}
                  component={AddDomainMember}
                  exact
                />
              </Fragment>
            </Route>
          </Fragment>
        </Route>
      </Switch>
    </Fragment>
  </Route>
);

export default withRouter(DomainRoutes);

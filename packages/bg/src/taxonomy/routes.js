import _ from "lodash/fp";
import pathToRegexp from "path-to-regexp";

const routes = {
  DOMAIN_ACTION: "/domains/:id/:action",
  DOMAIN_EDIT: "/domains/:id/edit",
  DOMAIN_MEMBERS_NEW: "/domains/:id/members/new",
  DOMAIN_MEMBERS: "/domains/:id/members",
  DOMAIN_NEW: "/domains/:id/new",
  DOMAIN: "/domains/:id",
  DOMAINS_ACTIONS: "/domains/:action",
  DOMAINS_NEW: "/domains/new",
  DOMAINS_SEARCH: "/domains/search",
  DOMAINS: "/domains"
};

const linkTo = _.mapValues(pathToRegexp.compile, routes);

export { routes as default, linkTo };

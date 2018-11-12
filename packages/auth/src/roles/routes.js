import _ from "lodash/fp";
import pathToRegexp from "path-to-regexp";

const routes = {
  ROLE: "/roles/:id",
  ROLES: "/roles",
  ROLES_NEW: "/roles/new"
};

const linkTo = _.mapValues(pathToRegexp.compile, routes);

export { routes as default, linkTo };

import _ from "lodash/fp";
import pathToRegexp from "path-to-regexp";

const routes = {
  USER_CREATE: "/users/new",
  USER_EDIT: "/users/:id/edit",
  USER_LIST: "/users",
  USER: "/users/:id"
};

const linkTo = _.mapValues(pathToRegexp.compile, routes);

export { routes as default, linkTo };

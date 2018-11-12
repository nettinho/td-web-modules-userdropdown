import _ from "lodash/fp";
import pathToRegexp from "path-to-regexp";

const routes = {
  GROUP_LIST: "/groups",
  GROUP: "/groups/:id",
  GROUP_CREATE: "/groups/new",
  GROUP_EDIT: "/groups/:id/edit"
};

const linkTo = _.mapValues(pathToRegexp.compile, routes);

export { routes as default, linkTo };

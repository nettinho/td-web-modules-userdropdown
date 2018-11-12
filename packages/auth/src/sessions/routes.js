import _ from "lodash/fp";
import pathToRegexp from "path-to-regexp";

const routes = {
  CALLBACK: "/callback",
  UNAUTHORIZED: "/unauthorized",
  LOGIN: "/login"
};

const linkTo = _.mapValues(pathToRegexp.compile, routes);

export { routes as default, linkTo };

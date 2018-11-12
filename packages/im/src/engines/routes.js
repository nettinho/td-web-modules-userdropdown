import _ from "lodash/fp";
import pathToRegexp from "path-to-regexp";

const routes = {
  ENGINES: "/engines",
  ENGINE_NEW: "/engines/new"
};

const linkTo = _.mapValues(pathToRegexp.compile, routes);

export { routes as default, linkTo };

import _ from "lodash/fp";
import pathToRegexp from "path-to-regexp";

const routes = {
  RULE: "/rules/:id",
  RULE_CONCEPT_NEW: "/concepts/:id/rules/new",
  RULE_EDIT: "/rules/:id/edit",
  RULE_NEW: "/rules/new",
  RULES: "/rules",
  RULE_IMPLEMENTATION_NEW: "/rules/:id/implementations/new",
  CURRENT_CONCEPT: "/concepts/:id"
};

const linkTo = _.mapValues(pathToRegexp.compile, routes);

export { routes as default, linkTo };

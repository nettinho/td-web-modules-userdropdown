import _ from "lodash/fp";
import pathToRegexp from "path-to-regexp";

const routes = {
  EVENTS: "/structures/:id/events",
  STRUCTURE: "/structures/:id",
  STRUCTURE_FIELD: "/structures/:structure_id/fields/:id",
  STRUCTURES: "/structures",
  LINEAGE: "/lineage/visualization?titles=:external_id&type_analysis=lineage",
  CONCEPT: "/concepts/:id"
};

const linkTo = _.mapValues(pathToRegexp.compile, routes);

export { routes as default, linkTo };

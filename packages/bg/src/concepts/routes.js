import _ from "lodash/fp";
import pathToRegexp from "path-to-regexp";

const routes = {
  CONCEPT: "/concepts/:id",
  CONCEPT_EDIT: "/concepts/:id/edit",
  CONCEPTS: "/concepts",
  CONCEPTS_PENDING: "/concepts_pending",
  CONCEPTS_NEW: "/concepts/new",
  CONCEPT_ARCHIVE: "/concepts/:id/archive",
  CONCEPT_EVENTS: "/concepts/:id/events",
  CONCEPT_DATA: "/concepts/:id/data",
  CONCEPT_DATA_NEW: "/concepts/:id/data/new",
  RULE_NEW: "/concepts/:id/rules/new",
  CONCEPT_RULES: "/concepts/:id/rules",
  RULE: "/rules/:id",
  CONCEPTS_UPLOAD: "/api/business_concept_versions/upload"
};

const linkTo = _.mapValues(pathToRegexp.compile, routes);

export { routes as default, linkTo };

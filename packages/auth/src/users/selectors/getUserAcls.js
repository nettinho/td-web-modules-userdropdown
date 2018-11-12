import _ from "lodash/fp";
import { createSelector } from "reselect";
import { getUser } from "./getUser";

const isAcl = m =>
  _.flow(
    _.get("group"),
    _.isEmpty
  )(m);

const buildAcl = m => ({
  resource: m.resource.name,
  role: m.role.name
});

export const getUserAcls = createSelector([getUser], user =>
  _.flow(
    _.get("acls"),
    _.filter(isAcl),
    _.map(buildAcl),
    _.sortBy(["resource", "role"])
  )(user)
);

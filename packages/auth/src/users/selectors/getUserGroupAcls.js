import _ from "lodash/fp";
import { createSelector } from "reselect";
import { getUser } from "./getUser";

const isGroupAcl = m =>
  !_.flow(
    _.get("group"),
    _.isEmpty
  )(m);

const buildGroupAcl = m => ({
  resource: m.resource.name,
  role: m.role.name,
  group: m.group.name
});

export const getUserGroupAcls = createSelector([getUser], user =>
  _.flow(
    _.get("acls"),
    _.filter(isGroupAcl),
    _.map(buildGroupAcl),
    _.sortBy(["resource", "role"])
  )(user)
);

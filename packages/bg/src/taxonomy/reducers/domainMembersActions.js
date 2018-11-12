import _ from "lodash/fp";
import { fetchDomain, fetchDomainMembers, clearDomain } from "../routines";

const initialState = {};

export const domainMembersActions = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case clearDomain.TRIGGER:
      return initialState;
    case fetchDomain.TRIGGER:
      return initialState;
    case fetchDomainMembers.SUCCESS:
      return _.getOr(initialState, "_actions")(payload);
    default:
      return state;
  }
};

export default domainMembersActions;

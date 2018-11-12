import _ from "lodash/fp";
import { fetchDomainMembers, deleteDomainMember } from "../routines";

const initialState = [];

const caseInsensitiveUsername = ({ user_name }) => _.lowerCase(user_name);

export const domainMembers = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchDomainMembers.SUCCESS: {
      const collection = _.get("data")(payload);
      return _.sortBy(caseInsensitiveUsername)(collection);
    }
    case deleteDomainMember.SUCCESS: {
      const { id } = payload;
      return _.filter(x => x.acl_entry_id !== id)(state);
    }
    default:
      return state;
  }
};

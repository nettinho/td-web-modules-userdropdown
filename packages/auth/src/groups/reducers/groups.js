import _ from "lodash/fp";
import { fetchGroups } from "../routines";

const initialState = [];

const caseInsensitiveName = ({ name }) => _.lowerCase(name);

const groups = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchGroups.SUCCESS:
      const collection = _.get("data")(payload);
      return _.sortBy(caseInsensitiveName)(collection);
    default:
      return state;
  }
};

const groupsLoading = (state = false, { type }) => {
  switch (type) {
    case fetchGroups.TRIGGER:
      return true;
    case fetchGroups.FULFILL:
      return false;
    default:
      return state;
  }
};

export { groups, groupsLoading };

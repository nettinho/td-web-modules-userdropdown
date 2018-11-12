import _ from "lodash/fp";
import { fetchUsers } from "../routines";

const initialState = [];

const caseInsensitiveName = ({ user_name }) => _.lowerCase(user_name);

const users = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchUsers.SUCCESS:
      const collection = _.get("data")(payload);
      return _.sortBy(caseInsensitiveName)(collection);
    default:
      return state;
  }
};

const usersLoading = (state = false, { type }) => {
  switch (type) {
    case fetchUsers.TRIGGER:
      return true;
    case fetchUsers.FULFILL:
      return false;
    default:
      return state;
  }
};

export { users, usersLoading };

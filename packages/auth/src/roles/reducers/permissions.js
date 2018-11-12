import _ from "lodash/fp";
import { fetchPermissions } from "../routines";

const initialState = [];

const pickFields = _.pick(["id", "name"]);

export const permissions = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchPermissions.TRIGGER:
      return initialState;
    case fetchPermissions.SUCCESS:
      return _.map(pickFields)(payload.data);
    default:
      return state;
  }
};

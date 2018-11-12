import _ from "lodash/fp";
import { fetchDomain, clearDomain } from "../routines";

const initialState = {};

export const domainActions = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearDomain.TRIGGER:
      return initialState;
    case fetchDomain.TRIGGER:
      return initialState;
    case fetchDomain.SUCCESS:
      return _.getOr(initialState, "_actions")(payload);
    default:
      return state;
  }
};

export default domainActions;

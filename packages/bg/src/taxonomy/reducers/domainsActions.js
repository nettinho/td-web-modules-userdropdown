import _ from "lodash/fp";
import { fetchDomains, clearDomains } from "../routines";

const initialState = {};

export const domainsActions = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearDomains.TRIGGER:
      return initialState;
    case fetchDomains.TRIGGER:
      return initialState;
    case fetchDomains.SUCCESS:
      return _.getOr(initialState, "_actions")(payload);
    default:
      return state;
  }
};

export default domainsActions;

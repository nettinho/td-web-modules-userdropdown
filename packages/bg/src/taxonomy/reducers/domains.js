import _ from "lodash/fp";
import { fetchDomains, clearDomains } from "../routines";

const initialState = [];

const caseInsensitiveName = ({ name }) => _.toLower(name);

export const domains = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchDomains.SUCCESS:
      const collection = _.get("data")(payload);
      return _.sortBy(caseInsensitiveName)(collection);
    case clearDomains.TRIGGER:
      return initialState;
    default:
      return state;
  }
};

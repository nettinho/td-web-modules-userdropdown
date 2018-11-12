import _ from "lodash/fp";
import { clearDomain, fetchDomain, updateDomain } from "../routines";

const initialState = {};

const pickFields = _.pick(["id", "parent_id", "name", "description", "type"]);

const domain = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearDomain.TRIGGER:
      return initialState;
    case fetchDomain.TRIGGER:
      return initialState;
    case fetchDomain.SUCCESS:
      return pickFields(payload.data);
    case updateDomain.SUCCESS:
      return pickFields(payload.data);
    default:
      return state;
  }
};

export { domain };

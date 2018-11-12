import _ from "lodash/fp";
import { clearEvents, fetchEvents } from "../routines";

const initialState = [];
const pickFields = _.pick([
  "id",
  "service",
  "resource_id",
  "resource_type",
  "event",
  "payload",
  "user_id",
  "user_name",
  "ts"
]);

const events = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchEvents.TRIGGER:
      return initialState;
    case clearEvents.TRIGGER:
      return initialState;
    case fetchEvents.SUCCESS:
      return _.map(pickFields)(payload.data) || [];
    default:
      return state;
  }
};

export { events };

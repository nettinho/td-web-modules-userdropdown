import _ from "lodash/fp";
import { clearConcept, conceptAction, fetchConcept } from "../routines";

const initialState = {};

export const conceptActions = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearConcept.TRIGGER:
      return initialState;
    case fetchConcept.TRIGGER:
      return initialState;
    case fetchConcept.SUCCESS:
      return _.getOr({}, "_actions")(payload);
    case conceptAction.SUCCESS:
      return _.getOr({}, "_actions")(payload);
    default:
      return state;
  }
};

export default conceptActions;

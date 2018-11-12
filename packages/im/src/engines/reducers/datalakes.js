import _ from "lodash/fp";
import { fetchDatalakes, clearDatalakes } from "../routines";

const initialState = [];

const pickFields = _.pick(["id", "name"]);

const datalakes = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearDatalakes.TRIGGER:
      return initialState;
    case fetchDatalakes.REQUEST:
      return initialState;
    case fetchDatalakes.TRIGGER:
      return initialState;
    case fetchDatalakes.SUCCESS:
      return _.sortBy("name")(_.map(pickFields)(payload.data)) || [];
    default:
      return state;
  }
};

export { datalakes };

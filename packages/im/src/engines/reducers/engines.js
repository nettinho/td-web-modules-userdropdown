import _ from "lodash/fp";
import { fetchEngines } from "../routines";

const initialState = [];

const pickFields = _.pick([
  "id",
  "datalake",
  "bucket",
  "system",
  "source",
  "status",
  "host",
  "port"
]);

const engines = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchEngines.TRIGGER:
      return initialState;
    case fetchEngines.SUCCESS:
      return _.sortBy("name")(_.map(pickFields)(payload.data)) || [];
    default:
      return state;
  }
};

export { engines };

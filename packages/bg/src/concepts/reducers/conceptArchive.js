import _ from "lodash/fp";
import { fetchConceptArchive, clearConceptArchive } from "../routines";

const initialState = [];

const pickFields = _.pick([
  "id",
  "last_change_at",
  "last_change_by",
  "status",
  "version"
]);

const conceptArchive = (state = initialState, { type, payload }) => {
  switch (type) {
    case clearConceptArchive.TRIGGER:
      return initialState;
    case fetchConceptArchive.REQUEST:
      return initialState;
    case fetchConceptArchive.SUCCESS:
      return _.flow(
        _.getOr([], "data"),
        _.map(pickFields),
        _.orderBy(["version"], ["desc"])
      )(payload);
    default:
      return state;
  }
};

export { conceptArchive };

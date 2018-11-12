import _ from "lodash/fp";
import {
  fetchStructures,
  updateStructure,
  clearStructureQueryFilters
} from "../routines";

const initialState = [];

const pickFields = _.pick([
  "id",
  "ou",
  "name",
  "group",
  "description",
  "system",
  "type"
]);

const structures = (state = initialState, { type, payload }) => {
  switch (type) {
    case fetchStructures.TRIGGER:
      return initialState;
    case fetchStructures.SUCCESS:
      const { data: response } = _.getOr({}, "data")(payload);
      return _.sortBy("name")(_.map(pickFields)(response)) || [];
    case updateStructure.SUCCESS:
      const { data } = payload || {};
      const a =
        data && data.id
          ? _.flow(
              _.filter(_.negate(_.propEq("id", data.id))),
              _.concat(pickFields(data)),
              _.sortBy("name")
            )(state)
          : state;
      return a;
    default:
      return state;
  }
};

export { structures };

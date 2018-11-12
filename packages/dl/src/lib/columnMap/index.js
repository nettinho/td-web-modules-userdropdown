import _ from "lodash/fp";
import { Map } from "immutable";
import trampoline from "../trampoline";

export const columnMap = (data, uuids) => {
  // predecessors and successors
  const successorPairs = _.map(({ uuid, depends }) => [uuid, depends])(
    _.filter(_.has("depends"))(data)
  );
  const successorMap = _.fromPairs(successorPairs);

  const getSuccessorIds = _.flow(
    _.flatMap(i => _.getOr([], i, successorMap)),
    _.uniq,
    _.without(uuids) // avoid loops
  );

  // calculate offsets
  const offsetReducer = (acc, ids, offset) => {
    if (_.isEmpty(ids)) {
      return acc;
    } else {
      const idOffsets = Map(_.map(i => [i, offset])(ids));
      const nextAcc = acc.merge(idOffsets);
      const nextIds = getSuccessorIds(ids);
      return () => offsetReducer(nextAcc, nextIds, offset + 1);
    }
  };

  return trampoline(offsetReducer)(Map(), uuids, 0);
};

import _ from "lodash/fp";
import { createSelector } from "reselect";
import { visit } from "zippa";
import { coordsVisitor } from "../lib/tree/visitors";
import { getSuccessorPairs } from "./getColumnMap";
import { getLineageData } from "./getLineageTree";

const toSvgPath = (
  { left: l0, right: r0, mid: y0 },
  { left: l1, right: r1, mid: y1 }
) => [
  l0 < l1
    ? `M ${r0 + 1} ${y0} C ${(r0 + 1 + l1) / 2} ${y0}, ${r0} ${y1}, ${l1} ${y1}`
    : `M ${r1 + 1} ${y1} C ${(r1 + 1 + l0) / 2} ${y1}, ${r1} ${y0}, ${l0} ${y0}`
];

const toPath = ([from, to]) => (from && to ? toSvgPath(from, to) : []);

export const getLineageLinks = createSelector(
  [getLineageData, getSuccessorPairs],
  ({ zipper }, pairs) => {
    const { state } = visit([coordsVisitor], null, zipper);
    const linkCoords = _.map(_.map(v => state.get(v)))(pairs);
    return _.flatMap(toPath)(linkCoords);
  }
);

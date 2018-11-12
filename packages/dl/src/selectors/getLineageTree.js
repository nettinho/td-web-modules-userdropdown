import _ from "lodash/fp";
import { createSelector } from "reselect";
import { makeZipper, visit } from "zippa";
import { Stack } from "immutable";
import { isBranch, getChildren, makeNode } from "../lib/node";
import {
  heightVisitor,
  columnVisitor,
  colsVisitor,
  parentVisitor,
  sortByColVisitor,
  svgVisitor,
  xyVisitor
} from "../lib/tree/visitors";
import { getColumnMap } from "./getColumnMap";
import { getTree } from "./getTrees";

const TreeZipper = makeZipper(isBranch, getChildren, makeNode);

const withHeight = ({ zipper }) => visit([heightVisitor], Stack(), zipper);

const withParent = ({ zipper }) => visit([parentVisitor], Stack(), zipper);

const withDimensions = cols => ({ zipper }) =>
  visit(
    [columnVisitor(cols), colsVisitor, svgVisitor, sortByColVisitor],
    {},
    zipper
  );

const withCoordinates = ({ zipper }) => visit([xyVisitor], Stack(), zipper);

export const getLineageData = createSelector(
  [getColumnMap, getTree],
  (columnMap, root) =>
    _.flow([
      root => TreeZipper.from(root),
      z => ({ zipper: z }),
      withHeight,
      withParent,
      withDimensions(columnMap),
      withCoordinates
    ])(root)
);

export const getLineageTree = createSelector([getLineageData], _.get("item"));

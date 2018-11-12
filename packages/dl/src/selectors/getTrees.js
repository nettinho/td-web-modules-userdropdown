import { createSelector } from "reselect";
import { forest, makeTree } from "../lib/forest";
import { getPaths } from "./getPaths";

const root = { uuid: "ROOT" };
export const getTrees = createSelector([getPaths], forest);
export const getTree = createSelector([getPaths], makeTree(root));

import _ from "lodash/fp";
import { clearRedirect } from "@truedat/core/routines";
import { createEngine } from "../routines";
import { linkTo } from "../routes";
import routes from "../routes";

const enginesUrl = () => routes.ENGINES;
const initialState = "";

export const engineRedirect = (
  state = initialState,
  { type, payload, meta }
) => {
  switch (type) {
    case clearRedirect.TRIGGER:
      return initialState;
    case createEngine.SUCCESS: {
      return linkTo.ENGINES({});
    }
    default:
      return state;
  }
};

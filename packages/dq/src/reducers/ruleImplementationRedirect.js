import { clearRedirect } from "@truedat/core/routines";
import { createRuleImplementation } from "../routines";

const initialState = "";

export const ruleImplementationRedirect = (
  state = initialState,
  { type, meta }
) => {
  switch (type) {
    case clearRedirect.TRIGGER:
      return initialState;
    case createRuleImplementation.SUCCESS:
      const { redirectUrl } = meta;
      return redirectUrl;
    default:
      return state;
  }
};

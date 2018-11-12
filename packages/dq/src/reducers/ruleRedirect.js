import _ from "lodash/fp";
import { clearRedirect } from "@truedat/core/routines";
import { createRule, updateRule, deleteRule } from "../routines";
import routes from "../routes";
import { linkTo } from "../routes";

const rulesUrl = () => routes.RULES;
const initialState = "";

export const ruleRedirect = (state = initialState, { type, payload, meta }) => {
  switch (type) {
    case clearRedirect.TRIGGER:
      return initialState;
    case createRule.SUCCESS: {
      const id = _.get("data.id")(payload);
      return linkTo.RULE({ id });
    }
    case deleteRule.SUCCESS:
      return rulesUrl();
    case updateRule.SUCCESS: {
      const { redirectUrl } = meta;
      return redirectUrl;
    }
    default:
      return state;
  }
};

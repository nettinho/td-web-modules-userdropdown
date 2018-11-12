import { createRule } from "../routines";

const ruleCreating = (state = false, { type }) => {
  switch (type) {
    case createRule.TRIGGER:
      return true;
    case createRule.FULFILL:
      return false;
    default:
      return state;
  }
};

export { ruleCreating };

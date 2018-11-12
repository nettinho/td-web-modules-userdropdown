import { updateRule } from "../routines";

const ruleUpdating = (state = false, { type }) => {
  switch (type) {
    case updateRule.TRIGGER:
      return true;
    case updateRule.FULFILL:
      return false;
    default:
      return state;
  }
};

export { ruleUpdating };

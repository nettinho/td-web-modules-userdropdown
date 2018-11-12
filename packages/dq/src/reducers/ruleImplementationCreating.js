import { createRuleImplementation } from "../routines";

const ruleImplementationCreating = (state = false, { type }) => {
  switch (type) {
    case createRuleImplementation.TRIGGER:
      return true;
    case createRuleImplementation.FULFILL:
      return false;
    default:
      return state;
  }
};

export { ruleImplementationCreating };

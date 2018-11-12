import { fetchRuleImplementations } from "../routines";

const ruleImplementationsLoading = (state = false, { type }) => {
  switch (type) {
    case fetchRuleImplementations.TRIGGER:
      return true;
    case fetchRuleImplementations.FULFILL:
      return false;
    default:
      return state;
  }
};

export { ruleImplementationsLoading };

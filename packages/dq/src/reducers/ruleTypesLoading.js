import { fetchRuleTypes } from "../routines";

const ruleTypesLoading = (state = false, { type }) => {
  switch (type) {
    case fetchRuleTypes.TRIGGER:
      return true;
    case fetchRuleTypes.FULFILL:
      return false;
    default:
      return state;
  }
};

export { ruleTypesLoading };

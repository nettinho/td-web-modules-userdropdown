import { fetchRule } from "../routines";

const ruleLoading = (state = false, { type }) => {
  switch (type) {
    case fetchRule.TRIGGER:
      return true;
    case fetchRule.FULFILL:
      return false;
    default:
      return state;
  }
};

export { ruleLoading };

import { executeRules } from "../routines";

export const executeRulesLoading = (state = false, { type }) => {
  switch (type) {
    case executeRules.TRIGGER:
      return true;
    case executeRules.FULFILL:
      return false;
    case executeRules.FAILURE:
      return false;
    default:
      return state;
  }
};

export default executeRulesLoading;

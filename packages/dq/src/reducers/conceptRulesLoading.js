import { clearConceptRules, fetchConceptRules } from "../routines";

const initialState = false;

const conceptRulesLoading = (state = initialState, { type }) => {
  switch (type) {
    case clearConceptRules.TRIGGER:
      return true;
    case fetchConceptRules.FULFILL:
      return false;
    default:
      return state;
  }
};

export { conceptRulesLoading };

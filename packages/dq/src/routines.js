import { createRoutine } from "redux-saga-routines";

export const clearRules = createRoutine("CLEAR_RULES");
export const fetchRules = createRoutine("FETCH_RULES");

export const clearRule = createRoutine("CLEAR_RULE");
export const fetchRule = createRoutine("FETCH_RULE");
export const updateRule = createRoutine("UPDATE_RULE");

export const clearRuleTypes = createRoutine("CLEAR_RULE_TYPES");
export const fetchRuleTypes = createRoutine("FETCH_RULE_TYPES");

export const clearRuleImplementations = createRoutine(
  "CLEAR_RULE_IMPLEMENTATIONS"
);
export const fetchRuleImplementations = createRoutine(
  "FETCH_RULE_IMPLEMENTATIONS"
);

export const createRule = createRoutine("CREATE_RULE");
export const createRuleImplementation = createRoutine(
  "CREATE_RULE_IMPLEMENTATION"
);
export const deleteRule = createRoutine("DELETE_RULE");

export const executeRules = createRoutine("EXECUTE_RULES");
export const fetchConceptRules = createRoutine("FETCH_CONCEPT_RULES");
export const clearConceptRules = createRoutine("CLEAR_CONCEPT_RULES");

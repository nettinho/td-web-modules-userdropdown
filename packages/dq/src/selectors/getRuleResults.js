import _ from "lodash/fp";

export const getRuleResults = ruleImplementations => {
  return _.flatten(
    ruleImplementations
      .map(ruleImplementation => ruleImplementation.rule_results)
      .map(results => results.map(result => result.result))
  );
};

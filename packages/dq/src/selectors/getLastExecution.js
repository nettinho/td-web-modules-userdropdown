import _ from "lodash/fp";

export const getLastExecution = ruleImplementations => {
  let last_date = _.last(
    _.flatten(
      ruleImplementations
        .map(ruleImplementation => ruleImplementation.rule_results)
        .map(results => results.map(date => new Date(date.date).getTime()))
    ).sort()
  );
  let date = new Date(last_date);
  return date.toString();
};

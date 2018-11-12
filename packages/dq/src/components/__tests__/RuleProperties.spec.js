import React from "react";
import { shallowWithIntl } from "intl-stub";
import { RuleProperties } from "../RuleProperties";

describe("<RuleProperties />", () => {
  it("matches the latest snapshot", () => {
    const props = {
      business_concept_id: "2D2B3",
      description: "desc1",
      goal: 10,
      minimum: 1,
      rule_type: { name: "type1" },
      principle: {
        name: "precision"
      }
    };
    const wrapper = shallowWithIntl(<RuleProperties {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallowWithIntl } from "intl-stub";
import RuleActions from "../RuleActions";

describe("<RuleActions />", () => {
  const rule = { id: 2, name: "foo", business_concept_id: 1 };
  const match = { params: { id: 1, qc_id: 2 } };
  const concepts = [
    {
      id: 1,
      name: "s1",
      description: "dd",
      version: "vs",
      status: "st",
      business_concept_id: 1
    }
  ];
  const props = { rule, concepts, match };
  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<RuleActions {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

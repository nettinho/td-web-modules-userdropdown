import React from "react";
import { shallowWithIntl } from "intl-stub";
import { RuleRange } from "../RuleRange";

describe("<RuleRange />", () => {
  const props = {
    minimum: 80,
    goal: 90
  };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<RuleRange {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallow } from "enzyme";
import { NewRuleImplementation } from "../NewRuleImplementation";

describe("<NewRuleImplementation />", () => {
  const createRuleImplementation = jest.fn();
  const ruleImplementation = { id: 1, name: "nn", description: "dd" };
  const props = { ruleImplementation, createRuleImplementation };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<NewRuleImplementation {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

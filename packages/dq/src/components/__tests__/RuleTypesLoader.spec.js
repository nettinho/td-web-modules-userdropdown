import React from "react";
import { shallow } from "enzyme";
import { RuleTypesLoader } from "../RuleTypesLoader";

describe("<RuleTypesLoader />", () => {
  it("matches the latest snapshot", () => {
    const fetchRuleTypes = jest.fn();
    const ruleTypesLoading = true;
    const props = { fetchRuleTypes, ruleTypesLoading };
    const wrapper = shallow(<RuleTypesLoader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a loader if ruleTypesLoading is true", () => {
    const fetchRuleTypes = jest.fn();
    const ruleTypesLoading = true;
    const props = { fetchRuleTypes, ruleTypesLoading };
    const wrapper = shallow(<RuleTypesLoader {...props} />);
    expect(wrapper.find("Loading").length).toBe(1);
  });

  it("renders null if ruleTypesLoading is false", () => {
    const fetchRuleTypes = jest.fn();
    const ruleTypesLoading = false;
    const props = { fetchRuleTypes, ruleTypesLoading };
    const wrapper = shallow(<RuleTypesLoader {...props} />);
    expect(wrapper.getElement()).toBeNull();
  });

  it("calls fetchRuleTypes when component mounts, clearRuleTypes when component unmounts", () => {
    const fetchRuleTypes = jest.fn();
    const clearRuleTypes = jest.fn();
    const ruleTypesLoading = false;
    const props = { fetchRuleTypes, ruleTypesLoading, clearRuleTypes };
    jest.spyOn(RuleTypesLoader.prototype, "componentDidMount");
    const wrapper = shallow(<RuleTypesLoader {...props} />);
    expect(RuleTypesLoader.prototype.componentDidMount.mock.calls.length).toBe(
      1
    );
    expect(clearRuleTypes.mock.calls.length).toBe(0);
    expect(fetchRuleTypes.mock.calls.length).toBe(1);
    wrapper.unmount();
    expect(clearRuleTypes.mock.calls.length).toBe(1);
    expect(fetchRuleTypes.mock.calls.length).toBe(1);
  });
});

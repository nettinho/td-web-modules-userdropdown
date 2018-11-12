import React from "react";
import { shallow } from "enzyme";
import { RulesLoader } from "../RulesLoader";

describe("<RulesLoader />", () => {
  it("matches the latest snapshot", () => {
    const fetchRules = jest.fn();
    const rulesLoading = true;
    const props = { fetchRules, rulesLoading };
    const wrapper = shallow(<RulesLoader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a loader if rulesLoading is true", () => {
    const fetchRules = jest.fn();
    const rulesLoading = true;
    const props = { fetchRules, rulesLoading };
    const wrapper = shallow(<RulesLoader {...props} />);
    expect(wrapper.find("Loading").length).toBe(1);
  });

  it("renders null if rulesLoading is false", () => {
    const fetchRules = jest.fn();
    const rulesLoading = false;
    const props = { fetchRules, rulesLoading };
    const wrapper = shallow(<RulesLoader {...props} />);
    expect(wrapper.getElement()).toBeNull();
  });

  it("calls fetchRules when component mounts, clearRules when component unmounts", () => {
    const fetchRules = jest.fn();
    const clearRules = jest.fn();
    const rulesLoading = false;
    const props = { fetchRules, rulesLoading, clearRules };
    jest.spyOn(RulesLoader.prototype, "componentDidMount");
    const wrapper = shallow(<RulesLoader {...props} />);
    expect(RulesLoader.prototype.componentDidMount.mock.calls.length).toBe(1);
    expect(clearRules.mock.calls.length).toBe(0);
    expect(fetchRules.mock.calls.length).toBe(1);
    wrapper.unmount();
    expect(clearRules.mock.calls.length).toBe(1);
    expect(fetchRules.mock.calls.length).toBe(1);
  });
});

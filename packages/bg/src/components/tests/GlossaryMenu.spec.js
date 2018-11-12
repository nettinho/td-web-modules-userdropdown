import React from "react";
import { shallow } from "enzyme";
import { GlossaryMenu } from "../GlossaryMenu";

describe("<GlossaryMenu />", () => {
  it("matches the latest snapshot", () => {
    const domainsPermissions = { list: true };
    const optionsDomains = jest.fn();
    const location = { pathname: "/" };

    const props = {
      domainsPermissions,
      optionsDomains,
      location
    };

    const wrapper = shallow(<GlossaryMenu {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("calls optionsDomains when component mounts", () => {
    jest.spyOn(GlossaryMenu.prototype, "componentDidMount");

    const domainsPermissions = {};
    const optionsDomains = jest.fn();
    const location = { pathname: "/" };

    const props = {
      domainsPermissions,
      optionsDomains,
      location
    };

    shallow(<GlossaryMenu {...props} />);
    expect(GlossaryMenu.prototype.componentDidMount.mock.calls.length).toBe(1);
    expect(optionsDomains.mock.calls.length).toBe(1);
  });
});

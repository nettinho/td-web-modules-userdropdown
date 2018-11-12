import React from "react";
import { shallow } from "enzyme";
import { QualityMenu } from "../QualityMenu";

describe("<QualityMenu />", () => {
  it("matches the latest snapshot", () => {
    const hideSidebar = jest.fn();
    const location = { pathname: "/" };
    const props = { hideSidebar, location };
    const wrapper = shallow(<QualityMenu {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

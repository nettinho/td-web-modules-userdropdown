import React from "react";
import { shallow } from "enzyme";
import { DictionaryMenu } from "../DictionaryMenu";

describe("<DictionaryMenu />", () => {
  it("matches the latest snapshot", () => {
    const hideSidebar = jest.fn();
    const location = { pathname: "/" };
    const props = { hideSidebar, location };
    const wrapper = shallow(<DictionaryMenu {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

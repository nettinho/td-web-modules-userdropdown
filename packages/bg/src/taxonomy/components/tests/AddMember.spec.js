import React from "react";
import { shallow } from "enzyme";
import { AddMember } from "../AddMember";

describe("<AddMember />", () => {
  it("matches the latest snapshot", () => {
    const wrapper = shallow(<AddMember />);
    expect(wrapper).toMatchSnapshot();
  });
});

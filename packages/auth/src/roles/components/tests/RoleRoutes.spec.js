import React from "react";
import { shallow } from "enzyme";
import { RoleRoutes } from "../RoleRoutes";

describe("<RoleRoutes />", () => {
  it("matches the latest snapshot", () => {
    const wrapper = shallow(<RoleRoutes />);
    expect(wrapper).toMatchSnapshot();
  });
});

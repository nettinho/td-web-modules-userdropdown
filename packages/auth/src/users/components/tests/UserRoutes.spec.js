import React from "react";
import { shallow } from "enzyme";
import { UserRoutes } from "../UserRoutes";

describe("<UserRoutes />", () => {
  it("matches the latest snapshot", () => {
    const wrapper = shallow(<UserRoutes />);
    expect(wrapper).toMatchSnapshot();
  });
});

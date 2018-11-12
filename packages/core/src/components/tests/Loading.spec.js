import React from "react";
import { shallow } from "enzyme";
import { Loading } from "../Loading";

describe("<Loading />", () => {
  it("matches the latest snapshot", () => {
    const wrapper = shallow(<Loading inline="centered" />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallow } from "enzyme";
import { EditRule } from "../EditRule";

describe("<EditRule />", () => {
  const updateRule = jest.fn();
  const rule = { id: 1, name: "nn", description: "dd" };
  const props = { rule, updateRule };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<EditRule {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

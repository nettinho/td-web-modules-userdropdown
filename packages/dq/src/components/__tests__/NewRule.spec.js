import React from "react";
import { shallow } from "enzyme";
import { NewRule } from "../NewRule";

describe("<NewRule />", () => {
  const createRule = jest.fn();
  const rule = { id: 1, name: "nn", description: "dd" };
  const props = { rule, createRule };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<NewRule {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

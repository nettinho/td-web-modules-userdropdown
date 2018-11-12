import React from "react";
import { shallow } from "enzyme";
import { Concepts } from "../Concepts";

describe("<Concepts />", () => {
  it("matches the latest snapshot", () => {
    const concepts = [
      { id: 1, name: "s1", description: "dd", version: "vs", status: "st" }
    ];
    const props = { concepts };
    const wrapper = shallow(<Concepts {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

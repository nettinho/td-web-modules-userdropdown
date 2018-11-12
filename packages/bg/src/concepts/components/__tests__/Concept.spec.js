import React from "react";
import { shallow } from "enzyme";
import { Concept } from "../Concept";

describe("<Concept />", () => {
  const props = { concept: { id: 1, name: "foo" } };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<Concept {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

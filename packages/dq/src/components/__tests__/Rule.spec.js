import React from "react";
import { shallow } from "enzyme";
import { Rule } from "../Rule";

describe("<Rule />", () => {
  const props = {
    rule: { id: 1, name: "foo" },
    match: { params: { id: 1, qc: 2 } }
  };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<Rule {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

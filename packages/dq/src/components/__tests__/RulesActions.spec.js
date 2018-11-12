import React from "react";
import { shallow } from "enzyme";
import { RulesActions } from "../RulesActions";

describe("<RulesActions />", () => {
  const props = { createUrl: "/url/to/create/concept" };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<RulesActions {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

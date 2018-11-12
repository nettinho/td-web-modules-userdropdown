import React from "react";
import { shallow } from "enzyme";
import { DomainDetail } from "../DomainDetail";

describe("<DomainDetail />", () => {
  const props = { id: 1, type: "type", name: "name", description: "desc" };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<DomainDetail {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

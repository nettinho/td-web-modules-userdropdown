import React from "react";
import { shallow } from "enzyme";
import { EditDomain } from "../EditDomain";

describe("<EditDomain />", () => {
  const updateDomain = jest.fn();
  const domain = { id: 1, name: "nn", description: "dd" };
  const props = { domain, updateDomain };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<EditDomain {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

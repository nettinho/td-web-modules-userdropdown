import React from "react";
import { shallow } from "enzyme";
import { NewDomain } from "../NewDomain";

describe("<NewDomain />", () => {
  const createDomain = jest.fn();
  const domain = { id: 1, name: "nn", description: "dd" };
  const props = { domain, createDomain };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<NewDomain {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

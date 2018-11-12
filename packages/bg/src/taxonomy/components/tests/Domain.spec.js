import React from "react";
import { shallow } from "enzyme";
import { Domain } from "../Domain";

describe("<Domain />", () => {
  const domain = { id: 3, name: "domain" };
  const domainLoading = false;
  const props = { domain, domainLoading };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<Domain {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

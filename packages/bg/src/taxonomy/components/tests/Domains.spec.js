import React from "react";
import { shallow } from "enzyme";
import { Domains } from "../Domains";

describe("<Domains />", () => {
  const createDomain = jest.fn();
  const domainsLoading = false;
  const props = { createDomain, domainsLoading };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<Domains {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallow } from "enzyme";
import { DateTime } from "../DateTime";

describe("<DateTime value='123124' />", () => {
  it("matches the latest snapshot", () => {
    const wrapper = shallow(<DateTime value="2018-06-27T07:32:53.154377Z" />);
    expect(wrapper).toMatchSnapshot();
  });
});

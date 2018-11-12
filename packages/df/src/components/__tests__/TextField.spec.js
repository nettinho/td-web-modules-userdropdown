import React from "react";
import { shallow } from "enzyme";
import { TextField } from "../TextField";

describe("<TextField />", () => {
  const label = "label";
  const name = "name";
  const required = true;
  const value = "Foo";
  const onChange = jest.fn();
  const props = { label, name, required, value, onChange };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<TextField {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

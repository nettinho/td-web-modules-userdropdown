import React from "react";
import { shallow } from "enzyme";
import { RadioField } from "../RadioField";

describe("<RadioField />", () => {
  const label = "label";
  const name = "name";
  const required = true;
  const value = "Foo";
  const values = ["Foo", "Bar"];
  const onChange = jest.fn();
  const props = { label, name, required, value, values, onChange };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<RadioField {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

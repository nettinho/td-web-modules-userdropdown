import React from "react";
import { shallow } from "enzyme";
import { ColorPickerField } from "../ColorPickerField";

describe("<ColorPickerField />", () => {
  const label = "label";
  const name = "name";
  const required = true;
  const value = "Foo";
  const onChange = jest.fn();
  const props = { label, name, required, value, onChange };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<ColorPickerField {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("call onChange function", () => {
    const color = { hex: "hex_value" };
    const component = shallow(<ColorPickerField {...props} />);
    component.find({ name: "color_picker" }).simulate("changeComplete", color);
    expect(onChange).toBeCalledWith(null, { name: "name", value: "hex_value" });
  });
});

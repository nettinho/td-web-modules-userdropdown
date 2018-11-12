import React from "react";
import { shallow } from "enzyme";
import { StructureFieldForm } from "../StructureFieldForm";

const preventDefault = () => {};

const updateField = (wrapper, instance, name, value) =>
  wrapper
    .find(instance)
    .simulate("change", { preventDefault }, { name, value });

describe("<StructureFieldForm />", () => {
  const updateStructureField = jest.fn();
  const structureField = {
    id: 1,
    description: "dd"
  };
  const props = {
    structureField,
    structureFieldUpdating: false,
    updateStructureField
  };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<StructureFieldForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("matches the latest snapshot (editing)", () => {
    const wrapper = shallow(<StructureFieldForm {...props} />);
    wrapper.find("p").simulate("click", { preventDefault });
    expect(wrapper).toMatchSnapshot();
  });

  it("becomes editable when the description is clicked", () => {
    const wrapper = shallow(<StructureFieldForm {...props} />);
    expect(wrapper.find("p").length).toEqual(1);
    expect(wrapper.find("Form").length).toEqual(0);
    wrapper.find("p").simulate("click", { preventDefault });
    expect(wrapper.find("p").length).toEqual(0);
    expect(wrapper.find("Form").length).toEqual(1);
  });

  it("updates the state and description field value on change", () => {
    const wrapper = shallow(<StructureFieldForm {...props} />);
    const newValue = "Something else";
    wrapper.find("p").simulate("click", { preventDefault });
    expect(wrapper.find("Form").length).toBe(1);
    expect(wrapper.find("FormInput").length).toBe(1);
    expect(wrapper.find("FormInput").props().value).toBe("dd");
    updateField(wrapper, "FormInput", "description", newValue);
    expect(wrapper.state("structureField").description).toEqual(newValue);
    expect(wrapper.find("FormInput").props().value).toEqual(newValue);
  });
});

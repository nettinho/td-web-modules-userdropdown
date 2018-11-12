import React from "react";
import { shallow } from "enzyme";
import { DynamicField } from "../DynamicField";

const onChange = jest.fn();

describe("<DynamicField />", () => {
  it("matches the latest snapshot (radio widget)", () => {
    const props = { widget: "radio", onChange };
    const wrapper = shallow(<DynamicField {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("matches the latest snapshot (dropdown widget)", () => {
    const props = { widget: "dropdown", onChange };
    const wrapper = shallow(<DynamicField {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("matches the latest snapshot (textarea widget)", () => {
    const props = { widget: "textarea", onChange };
    const wrapper = shallow(<DynamicField {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("matches the latest snapshot (color_picker widget)", () => {
    const props = { widget: "color_picker", onChange };
    const wrapper = shallow(<DynamicField {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("matches the latest snapshot (multiple_input widget)", () => {
    const props = { widget: "multiple_input", onChange };
    const wrapper = shallow(<DynamicField {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("matches the latest snapshot (pair_list widget)", () => {
    const props = { widget: "pair_list", onChange };
    const wrapper = shallow(<DynamicField {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("matches the latest snapshot (default widget)", () => {
    const props = { widget: "foo", onChange };
    const wrapper = shallow(<DynamicField {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("matches the latest snapshot (default widget) with form_type", () => {
    const props = { form_type: "foo", onChange };
    const wrapper = shallow(<DynamicField {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

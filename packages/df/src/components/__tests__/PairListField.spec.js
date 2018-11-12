import React from "react";
import { shallowWithIntl } from "intl-stub";
import { PairListField } from "../PairListField";

describe("<PairListField />", () => {
  const label = "label";
  const name = "name";
  const required = true;
  const value = [{ url_name: "Foo", url_value: "Bar" }];
  const onChange = jest.fn();
  const props = { label, name, required, value, onChange };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<PairListField {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("generates correct onChange value format when changing", () => {
    const data = {
      id: 0,
      name: "url_name",
      value: "data_value"
    };
    const component = shallowWithIntl(<PairListField {...props} />);
    component.find({ name: "url_name" }).simulate("change", null, data);
    expect(onChange).toBeCalledWith(null, {
      name: "name",
      value: [{ url_name: "data_value", url_value: "Bar" }]
    });
  });

  it("generates row when add buttom is pressed", () => {
    const event = { preventDefault() {} };
    const component = shallowWithIntl(<PairListField {...props} />);
    component.find({ name: "add_buttom" }).simulate("click", event);
    expect(onChange).toBeCalledWith(event, {
      name: "name",
      value: [
        { url_name: "Foo", url_value: "Bar" },
        { url_name: "", url_value: "" }
      ]
    });
  });

  it("deletes row when delete buttom is pressed", () => {
    const event = { preventDefault() {} };
    const component = shallowWithIntl(<PairListField {...props} />);
    component.find({ name: "delete_buttom" }).simulate("click", event);
    expect(onChange).toBeCalledWith(event, { name: "name", value: [] });
  });
});

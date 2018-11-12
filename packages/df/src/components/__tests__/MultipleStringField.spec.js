import React from "react";
import { shallowWithIntl } from "intl-stub";
import { MultipleStringField } from "../MultipleStringField";

describe("<MultipleStringField />", () => {
  const label = "label";
  const name = "name";
  const required = true;
  const value = [];
  const onChange = jest.fn();
  const props = { label, name, required, value, onChange };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<MultipleStringField {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallowWithIntl } from "intl-stub";
import { DropdownField } from "../DropdownField";

describe("<DropdownField />", () => {
  const label = "label";
  const name = "name";
  const required = true;
  const value = "Foo";
  const onChange = jest.fn();
  const props = { label, name, required, value, onChange };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<DropdownField {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

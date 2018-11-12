import React from "react";
import { shallowWithIntl } from "intl-stub";
import { RolesMenuItem } from "../RolesMenuItem";

describe("<RolesMenuItem />", () => {
  const hideSidebar = jest.fn();
  const location = { pathname: "/" };
  const props = { hideSidebar, location };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<RolesMenuItem {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

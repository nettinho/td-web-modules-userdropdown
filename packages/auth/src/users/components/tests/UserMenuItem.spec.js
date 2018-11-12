import React from "react";
import { shallowWithIntl } from "intl-stub";
import { UserMenuItem } from "../UserMenuItem";

describe("<UserMenuItem />", () => {
  const hideSidebar = jest.fn();
  const location = { pathname: "/" };
  const props = { hideSidebar, location };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<UserMenuItem {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

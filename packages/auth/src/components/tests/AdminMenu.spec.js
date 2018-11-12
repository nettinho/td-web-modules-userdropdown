import React from "react";
import { shallowWithIntl } from "intl-stub";
import { AdminMenu } from "../AdminMenu";

describe("<AdminMenu />", () => {
  it("matches the latest snapshot", () => {
    const location = { pathname: "/" };
    const props = { location };
    const wrapper = shallowWithIntl(<AdminMenu {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

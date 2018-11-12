import React from "react";
import { shallowWithIntl } from "intl-stub";
import { IntakeMenu } from "../IntakeMenu";

describe("<IntakeMenu />", () => {
  it("matches the latest snapshot", () => {
    const location = { pathname: "/" };
    const props = { location };
    const wrapper = shallowWithIntl(<IntakeMenu {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

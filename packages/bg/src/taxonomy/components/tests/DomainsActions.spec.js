import React from "react";
import { shallowWithIntl } from "intl-stub";
import { DomainsActions } from "../DomainsActions";

describe("<DomainsActions />", () => {
  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<DomainsActions />);
    expect(wrapper).toMatchSnapshot();
  });
});

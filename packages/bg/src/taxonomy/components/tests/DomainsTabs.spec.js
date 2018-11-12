import React from "react";
import { shallowWithIntl } from "intl-stub";
import routes from "../../routes";
import { DomainsTabs } from "../DomainsTabs";

describe("<DomainsTabs />", () => {
  it("matches the latest snapshot", () => {
    const handleChange = jest.fn();
    const match = { path: routes.DOMAINS };
    const props = { handleChange, match };

    const wrapper = shallowWithIntl(<DomainsTabs {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

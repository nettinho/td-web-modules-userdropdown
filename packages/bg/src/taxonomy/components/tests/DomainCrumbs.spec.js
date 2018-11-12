import React from "react";
import { shallowWithIntl } from "intl-stub";
import { DomainCrumbs } from "../DomainCrumbs";

describe("<DomainCrumbs />", () => {
  const parents = [{ id: 1, name: "p1" }, { id: 2, text: "p2" }];
  const domain = { id: 3, name: "domain" };
  const props = { parents, domain };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<DomainCrumbs {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

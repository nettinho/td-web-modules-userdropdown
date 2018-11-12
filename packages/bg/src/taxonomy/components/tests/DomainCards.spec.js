import React from "react";
import { shallowWithIntl } from "intl-stub";
import { DomainCards } from "../DomainCards";

describe("<DomainCards />", () => {
  const visibleDomains = [
    { id: 1, name: "domain1" },
    { id: 2, name: "domain2" }
  ];
  const domainsFilter = "d";
  const props = { visibleDomains, domainsFilter };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<DomainCards {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

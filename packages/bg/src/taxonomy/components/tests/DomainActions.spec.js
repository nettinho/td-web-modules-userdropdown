import React from "react";
import { shallowWithIntl } from "intl-stub";
import { DomainActions } from "../DomainActions";

describe("<DomainActions />", () => {
  const _delete = jest.fn();
  const create = jest.fn();
  const domain = { id: 3, name: "domain" };
  const domainActions = { delete: _delete, create };
  const props = { domain, domainActions };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<DomainActions {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

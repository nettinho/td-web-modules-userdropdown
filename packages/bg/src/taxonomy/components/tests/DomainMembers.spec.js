import React from "react";
import { shallowWithIntl } from "intl-stub";
import { DomainMembers } from "../DomainMembers";

describe("<DomainMembers />", () => {
  const domainMembersLoading = false;
  const domainMembers = [{ id: 1, name: "d1" }, { id: 2, name: "d2" }];
  const props = { domainMembers, domainMembersLoading };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<DomainMembers {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

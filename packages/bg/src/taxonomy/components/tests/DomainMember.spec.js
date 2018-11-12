import React from "react";
import { shallowWithIntl } from "intl-stub";
import { DomainMember } from "../DomainMember";

describe("<DomainMember />", () => {
  const deleteDomainMember = jest.fn();
  const domainMemberDeleting = [];
  const member = {
    user_id: 1,
    role_name: "admin",
    user_name: "user1",
    acl_entry_id: 1
  };
  const props = { deleteDomainMember, domainMemberDeleting, ...member };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<DomainMember {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

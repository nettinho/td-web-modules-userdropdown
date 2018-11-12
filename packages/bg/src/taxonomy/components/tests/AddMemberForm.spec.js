import React from "react";
import { shallowWithIntl } from "intl-stub";
import { AddMemberForm } from "../AddMemberForm";

describe("<AddMemberForm />", () => {
  const addDomainMember = jest.fn();
  const principals = [
    { key: 1, text: "p1", value: "p1" },
    { key: 2, text: "p2", value: "p2" }
  ];
  const roles = [
    { key: 1, text: "role1", value: "role1" },
    { key: 2, text: "role2", value: "role2" }
  ];
  const props = { addDomainMember, principals, roles };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<AddMemberForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallow } from "enzyme";
import { Role } from "../Role";

describe("<Role />", () => {
  const id = 1;
  const name = "Data Steward";
  const rolePermissions = [];
  const permissionGroups = [["Group1", [{ id: 1, name: "perm1" }]]];
  const props = { id, name, rolePermissions, permissionGroups };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<Role {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallowWithIntl } from "intl-stub";
import { PermissionGroup } from "../PermissionGroup";

describe("<PermissionGroup />", () => {
  const id = 1;
  const name = "Taxonomy";
  const permissions = [{ id: 1, name: "perm1" }, { id: 4, name: "perm4" }];
  const rolePermissions = [{ id: 1, name: "perm1" }, { id: 3, name: "perm3" }];
  const props = { id, name, rolePermissions, permissions };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<PermissionGroup {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

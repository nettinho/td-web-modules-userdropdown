import React from "react";
import { shallowWithIntl } from "intl-stub";
import { StructureOUPopup } from "../StructureOUPopup";

describe("<StructureOUPopup />", () => {
  it("matches the latest snapshot", () => {
    const props = {
      id: 1,
      children: <h1>Hello</h1>,
      ou: "xxx",
      updateStructure: jest.fn(),
      domains: [{ id: 1, name: "domain 1" }]
    };

    const wrapper = shallowWithIntl(<StructureOUPopup {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

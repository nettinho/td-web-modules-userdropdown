import React from "react";
import { shallowWithIntl } from "intl-stub";
import { StructureFieldProperties } from "../StructureFieldProperties";

describe("<StructureFieldProperties />", () => {
  it("matches the latest snapshot", () => {
    const props = {
      id: 1,
      name: "f1",
      description: "dd",
      type: "tp",
      nullable: true,
      precision: "22"
    };
    const wrapper = shallowWithIntl(<StructureFieldProperties {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

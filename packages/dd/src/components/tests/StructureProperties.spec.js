import React from "react";
import { shallowWithIntl } from "intl-stub";
import { StructureProperties } from "../StructureProperties";

describe("<StructureProperties />", () => {
  it("matches the latest snapshot", () => {
    const structure = {
      id: 1,
      name: "s1",
      description: "dd",
      group: "gp",
      system: "sys"
    };
    const wrapper = shallowWithIntl(<StructureProperties {...structure} />);
    expect(wrapper).toMatchSnapshot();
  });
});

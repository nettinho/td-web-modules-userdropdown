import React from "react";
import { shallow } from "enzyme";
import { StructureSummary } from "../StructureSummary";

describe("<StructureSummary />", () => {
  it("matches the latest snapshot", () => {
    const structure = {
      id: 1,
      name: "s1",
      description: "dd",
      group: "gp",
      system: "sys"
    };
    const wrapper = shallow(<StructureSummary {...structure} />);
    expect(wrapper).toMatchSnapshot();
  });
});

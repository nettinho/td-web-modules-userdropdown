import React from "react";
import { shallow } from "enzyme";
import { StructureField } from "../StructureField";

describe("<StructureField />", () => {
  it("matches the latest snapshot", () => {
    const structureField = {
      id: 1,
      name: "f1",
      description: "dd",
      type: "tp",
      nullable: true,
      precision: "22"
    };
    const wrapper = shallow(<StructureField {...structureField} />);
    expect(wrapper).toMatchSnapshot();
  });
});

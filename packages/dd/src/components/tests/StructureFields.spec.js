import React from "react";
import { shallow } from "enzyme";
import { StructureFields } from "../StructureFields";

describe("<StructureFields />", () => {
  it("matches the latest snapshot", () => {
    const structure = {
      fields: [
        {
          id: 123,
          name: "field1",
          description: "desc1",
          type: "varchar",
          nullable: true,
          precision: "22"
        },
        {
          id: 122,
          name: "field2",
          description: "desc2",
          type: "varchar",
          nullable: true,
          precision: "22"
        }
      ]
    };

    const wrapper = shallow(<StructureFields {...structure} />);
    expect(wrapper).toMatchSnapshot();
  });
});

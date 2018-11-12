import React from "react";
import { shallow } from "enzyme";
import { ConceptDetails } from "../ConceptDetails";

describe("<ConceptDetails />", () => {
  const props = {
    concept: { name: "Concept1", type: "type", status: "draft" },
    fieldValues: [
      ["group1", [{ field: "Field1", value: "Value1" }]],
      [
        "group2",
        [
          { field: "Field2", value: "Value2" },
          { field: "Field3", value: "Value3" }
        ]
      ]
    ]
  };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<ConceptDetails {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

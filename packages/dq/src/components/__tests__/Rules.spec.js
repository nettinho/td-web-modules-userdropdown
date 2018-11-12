import React from "react";
import { shallow } from "enzyme";
import { Rules } from "../Rules";

describe("<Rules />", () => {
  it("matches the latest snapshot", () => {
    const rules = {
      rules: [
        {
          id: 123,
          business_concept_id: "2D2B3",
          name: "control1",
          description: "desc1",
          goal: 10,
          minimum: 1,
          principle: { name: "principle1" },
          type: "type1",
          type_params: {},
          status: "status1"
        },
        {
          id: 122,
          business_concept_id: "2D2B4",
          name: "control2",
          description: "desc2",
          goal: 10,
          minimum: 1,
          principle: { name: "principle2" },
          type: "type2",
          type_params: {},
          status: "status2"
        }
      ]
    };
    const wrapper = shallow(<Rules {...rules} />);
    expect(wrapper).toMatchSnapshot();
  });
});

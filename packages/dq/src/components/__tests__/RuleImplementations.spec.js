import React from "react";
import { shallow } from "enzyme";
import { RuleImplementations } from "../RuleImplementations";

describe("<RuleImplementations />", () => {
  it("matches the latest snapshot", () => {
    const rule = {
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
    };
    const ruleImplementations = [
      {
        id: 9,
        name: "NameRule1",
        description: "RuleDesc1",
        system: "SYS",
        type: "integer_values_range",
        system_params: { table: "Tabla1", column: "Columna1" }
      },
      {
        id: 10,
        name: "NameRule2",
        description: "RuleDesc2",
        system: "SYS",
        type: "integer_values_range",
        system_params: { table: "Tabla2", column: "Columna2" }
      }
    ];
    const props = {
      ruleImplementations,
      rule
    };

    const wrapper = shallow(<RuleImplementations {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

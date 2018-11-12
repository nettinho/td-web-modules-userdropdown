import React from "react";
import { shallowWithIntl } from "intl-stub";
import { RuleForm } from "../RuleForm";

describe("<RuleForm />", () => {
  const rule = {
    id: 123,
    business_concept_id: "2D2B3",
    name: "control1",
    description: "desc1",
    goal: 10,
    minimum: 1,
    principle: { name: "principle1" },
    type: "type1",
    type_params: { min_value: 10000, max_value: 20000 },
    status: "status1"
  };
  const handleSubmit = jest.fn();
  const isSubmitting = false;
  const type_params = {};
  const params = {};
  const ruleTypes = [
    {
      id: 10,
      name: "max_value",
      params: {
        type_params: [{ type: "integer", name: "max_value" }],
        system_params: [
          { type: "string", name: "table" },
          { type: "string", name: "column" }
        ]
      }
    },
    {
      id: 11,
      name: "min_value",
      params: {
        type_params: [{ type: "integer", name: "min_value" }],
        system_params: [
          { type: "string", name: "table" },
          { type: "string", name: "column" }
        ]
      }
    }
  ];
  const business_concept_id = 123;

  const props = {
    rule,
    handleSubmit,
    isSubmitting,
    type_params,
    params,
    ruleTypes,
    business_concept_id
  };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<RuleForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

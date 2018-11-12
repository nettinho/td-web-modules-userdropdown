import React from "react";
import { shallowWithIntl } from "intl-stub";
import { RuleImplementationForm } from "../RuleImplementationForm";

describe("<RuleImplementationForm />", () => {
  const ruleImplementation = {
    id: 9,
    name: "NameRule",
    description: "RuleDesc",
    system: "SYS",
    system_params: { table: "Tabla", column: "Columna" }
  };
  const rule = {
    id: 123,
    business_concept_id: "2D2B3",
    name: "control1",
    description: "desc1",
    goal: 10,
    minimum: 1,
    principle: { name: "principle1" },
    rule_type_id: 10,
    rule_type: {
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
    type_params: { min_value: 10000, max_value: 20000 },
    status: "status1"
  };
  const handleSubmit = jest.fn();
  const isSubmitting = false;

  const props = {
    ruleImplementation,
    rule,
    handleSubmit,
    isSubmitting
  };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<RuleImplementationForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallowWithIntl } from "intl-stub";
import { ConceptForm } from "../ConceptForm";

describe("<ConceptForm />", () => {
  const conceptAction = jest.fn();
  const fetchTemplates = jest.fn();
  const domains = [{ id: 1, name: "Domain1" }, { id: 2, name: "Domain 2" }];
  const conceptActionLoading = "some action";
  const action = {};
  const template = {
    name: "Template1",
    id: 5,
    content: [
      {
        type: "string",
        required: false,
        name: "field1",
        label: "S1 String"
      },
      {
        values: ["Option 1", "Option 2", "Option 3"],
        type: "list",
        required: true,
        name: "field7",
        label: "List",
        group: "Group 1",
        default: "Option 2"
      }
    ]
  };

  const props = {
    conceptAction,
    fetchTemplates,
    domains,
    conceptActionLoading,
    action,
    template
  };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<ConceptForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallowWithIntl } from "intl-stub";
import { DomainForm } from "../DomainForm";

describe("<DomainForm />", () => {
  const handleSubmit = jest.fn();
  const domain = { id: 1, name: "nn", description: "dd" };
  const isSubmitting = false;
  const props = { domain, handleSubmit, isSubmitting };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<DomainForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

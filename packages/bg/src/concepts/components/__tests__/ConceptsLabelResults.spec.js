import React from "react";
import { shallowWithIntl } from "intl-stub";
import { ConceptsLabelResults } from "../ConceptsLabelResults";

describe("<ConceptsLabelResults />", () => {
  const props = { conceptCount: 22 };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<ConceptsLabelResults {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

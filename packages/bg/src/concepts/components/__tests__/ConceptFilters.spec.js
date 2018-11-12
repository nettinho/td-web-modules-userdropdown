import React from "react";
import { shallowWithIntl } from "intl-stub";
import { ConceptFilters } from "../ConceptFilters";

describe("<ConceptFilters />", () => {
  const active = true;
  const conceptSelectedFilters = {
    selectedFilters: [],
    openFilter: undefined
  };

  it("matches the latest snapshot", () => {
    const props = { active, conceptSelectedFilters };
    const wrapper = shallowWithIntl(<ConceptFilters {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

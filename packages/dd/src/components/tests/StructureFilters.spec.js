import React from "react";
import { shallowWithIntl } from "intl-stub";
import { StructureFilters } from "../StructureFilters";

describe("<StructureFilters />", () => {
  const active = true;
  const structureSelectedFilters = {
    selectedFilters: [],
    openFilter: undefined
  };

  it("matches the latest snapshot", () => {
    const props = { active, structureSelectedFilters };
    const wrapper = shallowWithIntl(<StructureFilters {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

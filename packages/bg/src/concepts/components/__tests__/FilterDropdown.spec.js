import React from "react";
import { shallowWithIntl } from "intl-stub";
import { FilterDropdown } from "../FilterDropdown";

describe("<FilterDropdown />", () => {
  const filterName = "status";
  const values = ["draft", "published", "versioned", "deprecated"];
  const open = true;
  const onOpen = jest.fn();
  const fetchConcepts = jest.fn();
  const activeFilters = { domain: "Domain 1", status: "draft" };

  it("matches the latest snapshot", () => {
    const props = {
      filterName,
      values,
      open,
      onOpen,
      fetchConcepts,
      activeFilters
    };
    const wrapper = shallowWithIntl(<FilterDropdown {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

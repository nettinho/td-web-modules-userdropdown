import React from "react";
import { shallowWithIntl } from "intl-stub";
import { StructuresLabelResults } from "../StructuresLabelResults";

describe("<StructuresLabelResults />", () => {
  const props = { structureCount: 22 };

  it("matches the latest snapshot", () => {
    const wrapper = shallowWithIntl(<StructuresLabelResults {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

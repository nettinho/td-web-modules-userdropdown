import React from "react";
import { shallow } from "enzyme";
import { ConceptLinks } from "../ConceptLinks";

describe("<ConceptLinks />", () => {
  it("matches the latest snapshot (empty)", () => {
    const wrapper = shallow(<ConceptLinks />);
    expect(wrapper).toMatchSnapshot();
  });

  it("matches the latest snapshot (loading)", () => {
    const wrapper = shallow(<ConceptLinks conceptLinksLoading />);
    expect(wrapper).toMatchSnapshot();
  });

  it("matches the latest snapshot (non-empty)", () => {
    const field = {
      ou: "ou",
      system: "system",
      group: "group",
      structure: "structure",
      field: "id"
    };
    const conceptLinksLoading = false;
    const conceptLinks = [{ id: 1, field }, { id: 2, field }];
    const props = {
      conceptLinks,
      conceptLinksLoading
    };

    const wrapper = shallow(<ConceptLinks {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

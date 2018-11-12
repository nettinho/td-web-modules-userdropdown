import React from "react";
import { shallow } from "enzyme";
import { ConceptHeader } from "../ConceptHeader";

describe("<ConceptHeader />", () => {
  const props = {
    concept: {
      name: "Concept1"
    },
    domain: {
      name: "Domain name"
    },
    template: {
      label: "Template1"
    }
  };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<ConceptHeader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

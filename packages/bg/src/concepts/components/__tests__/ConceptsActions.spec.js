import React from "react";
import { shallow } from "enzyme";
import { ConceptsActions } from "../ConceptsActions";

describe("<ConceptsActions />", () => {
  const props = { createUrl: "/url/to/create/concept" };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<ConceptsActions {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

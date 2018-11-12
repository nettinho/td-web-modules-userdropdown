import React from "react";
import { shallow } from "enzyme";
import { ConceptActions } from "../ConceptActions";

describe("<ConceptActions />", () => {
  const conceptAction = jest.fn();
  const conceptActions = {
    action1: { method: "POST", href: "/api/action1" },
    action2: { method: "GET", href: "/api/action2" }
  };

  const props = {
    conceptAction,
    conceptActions
  };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<ConceptActions {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

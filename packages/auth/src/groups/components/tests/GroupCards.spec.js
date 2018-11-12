import React from "react";
import { shallow } from "enzyme";
import { GroupCards } from "../GroupCards";

describe("<GroupCards />", () => {
  const deleteGroup = jest.fn();
  const groups = [{ id: 1 }, { id: 2 }];
  const props = { groups, deleteGroup };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<GroupCards {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

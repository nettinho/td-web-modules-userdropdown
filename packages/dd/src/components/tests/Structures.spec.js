import React from "react";
import { shallow } from "enzyme";
import { Structures } from "../Structures";

describe("<Structures />", () => {
  it("matches the latest snapshot", () => {
    const structures = [
      {
        id: 1,
        ou: "org",
        name: "s1",
        description: "dd",
        group: "gp",
        system: "sys"
      }
    ];
    const props = { structures };
    const wrapper = shallow(<Structures {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

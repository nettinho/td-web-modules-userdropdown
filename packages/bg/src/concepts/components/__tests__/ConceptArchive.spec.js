import React from "react";
import { shallow } from "enzyme";
import { ConceptArchive } from "../ConceptArchive";

describe("<ConceptArchive />", () => {
  it("matches the latest snapshot", () => {
    const conceptArchive = [
      {
        id: 123,
        status: "status",
        last_change_at: "2018-06-27T07:32:53.154377Z",
        last_change_by: "maixu",
        version: 1
      }
    ];
    const props = { conceptArchive };
    const wrapper = shallow(<ConceptArchive {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from "react";
import { shallow } from "enzyme";
import ConceptArchiveRow from "../ConceptArchiveRow";

describe("<ConceptArchiveRow />", () => {
  it("matches the latest snapshot", () => {
    const props = {
      id: 123,
      status: "status",
      last_change_at: "2018-06-27T07:32:53.154377Z",
      last_change_by: "maixu",
      version: 1
    };
    const wrapper = shallow(<ConceptArchiveRow {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

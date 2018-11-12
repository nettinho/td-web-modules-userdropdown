import React from "react";
import { shallow } from "enzyme";
import { Events } from "../Events";

describe("<Events />", () => {
  it("matches the latest snapshot", () => {
    const events = [
      {
        id: 1,
        service: "My invented service 1",
        resource_id: 2,
        payload: [{ field: "Ou", value: 5 }, { field: "id", value: 6 }]
      },
      {
        id: 2,
        service: "My invented service 2",
        resource_id: 2,
        payload: [{ field: "Ou", value: 7 }, { field: "id", value: 3 }]
      }
    ];
    const props = { events };
    const wrapper = shallow(<Events {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

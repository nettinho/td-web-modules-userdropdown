import React from "react";
import { shallow } from "enzyme";
import { StructuresLoader } from "../StructuresLoader";

describe("<StructuresLoader />", () => {
  it("matches the latest snapshot", () => {
    const fetchStructures = jest.fn();
    const structuresLoading = true;
    const props = { fetchStructures, structuresLoading };
    const wrapper = shallow(<StructuresLoader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a loader if structuresLoading is true", () => {
    const fetchStructures = jest.fn();
    const structuresLoading = true;
    const props = { fetchStructures, structuresLoading };
    const wrapper = shallow(<StructuresLoader {...props} />);
    expect(wrapper.find("Loading").length).toBe(1);
  });

  it("renders null if structuresLoading is false", () => {
    const fetchStructures = jest.fn();
    const structuresLoading = false;
    const props = { fetchStructures, structuresLoading };
    const wrapper = shallow(<StructuresLoader {...props} />);
    expect(wrapper.getElement()).toBeNull();
  });

  it("calls fetchStructures when component mounts, clearStructures when component unmounts", () => {
    const fetchStructures = jest.fn();
    const clearStructures = jest.fn();
    const structuresLoading = false;
    const props = { fetchStructures, structuresLoading, clearStructures };
    jest.spyOn(StructuresLoader.prototype, "componentDidMount");
    const wrapper = shallow(<StructuresLoader {...props} />);
    expect(StructuresLoader.prototype.componentDidMount.mock.calls.length).toBe(
      1
    );
    expect(clearStructures.mock.calls.length).toBe(0);
    expect(fetchStructures.mock.calls.length).toBe(1);
    wrapper.unmount();
    expect(clearStructures.mock.calls.length).toBe(1);
    expect(fetchStructures.mock.calls.length).toBe(1);
  });
});

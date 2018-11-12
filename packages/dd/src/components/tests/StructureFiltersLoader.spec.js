import React from "react";
import { shallow } from "enzyme";
import { StructureFiltersLoader } from "../StructureFiltersLoader";

describe("<StructureFiltersLoader />", () => {
  const structureFiltersLoading = false;
  const fetchStructureFilters = jest.fn();
  const clearStructureFilters = jest.fn();

  it("matches the latest snapshot", () => {
    const structureFiltersLoading = true;
    const props = {
      clearStructureFilters,
      fetchStructureFilters,
      structureFiltersLoading
    };
    const wrapper = shallow(<StructureFiltersLoader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a loader if structureFiltersLoading is true", () => {
    const structureFiltersLoading = true;
    const props = {
      clearStructureFilters,
      fetchStructureFilters,
      structureFiltersLoading
    };
    const wrapper = shallow(<StructureFiltersLoader {...props} />);
    expect(wrapper.find("Loading").length).toBe(1);
  });

  it("renders null if structureFiltersLoading is false", () => {
    const props = {
      clearStructureFilters,
      fetchStructureFilters,
      structureFiltersLoading
    };
    const wrapper = shallow(<StructureFiltersLoader {...props} />);
    expect(wrapper.getElement()).toBeNull();
  });

  it("calls fetchStructureFilters when component mounts but not when it unmounts", () => {
    const fetchStructureFilters = jest.fn();
    const props = {
      clearStructureFilters,
      fetchStructureFilters,
      structureFiltersLoading
    };
    jest.spyOn(StructureFiltersLoader.prototype, "componentDidMount");
    const wrapper = shallow(<StructureFiltersLoader {...props} />);
    expect(
      StructureFiltersLoader.prototype.componentDidMount.mock.calls.length
    ).toBe(1);
    expect(fetchStructureFilters.mock.calls.length).toBe(1);
    wrapper.unmount();
    expect(fetchStructureFilters.mock.calls.length).toBe(1);
  });

  it("calls clearStructureFilters when component unmounts but not when it mounts", () => {
    const clearStructureFilters = jest.fn();
    const props = {
      clearStructureFilters,
      fetchStructureFilters,
      structureFiltersLoading
    };
    jest.spyOn(StructureFiltersLoader.prototype, "componentWillUnmount");
    const wrapper = shallow(<StructureFiltersLoader {...props} />);
    expect(clearStructureFilters.mock.calls.length).toBe(0);
    wrapper.unmount();
    expect(
      StructureFiltersLoader.prototype.componentWillUnmount.mock.calls.length
    ).toBe(1);
    expect(clearStructureFilters.mock.calls.length).toBe(1);
  });
});

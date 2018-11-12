import React from "react";
import { shallow } from "enzyme";
import { ConceptFiltersLoader } from "../ConceptFiltersLoader";

describe("<ConceptFiltersLoader />", () => {
  const conceptFiltersLoading = false;
  const fetchConceptFilters = jest.fn();
  const clearConceptFilters = jest.fn();

  it("matches the latest snapshot", () => {
    const conceptFiltersLoading = true;
    const props = {
      clearConceptFilters,
      fetchConceptFilters,
      conceptFiltersLoading
    };
    const wrapper = shallow(<ConceptFiltersLoader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a loader if conceptFiltersLoading is true", () => {
    const conceptFiltersLoading = true;
    const props = {
      clearConceptFilters,
      fetchConceptFilters,
      conceptFiltersLoading
    };
    const wrapper = shallow(<ConceptFiltersLoader {...props} />);
    expect(wrapper.find("Loading").length).toBe(1);
  });

  it("renders null if conceptFiltersLoading is false", () => {
    const props = {
      clearConceptFilters,
      fetchConceptFilters,
      conceptFiltersLoading
    };
    const wrapper = shallow(<ConceptFiltersLoader {...props} />);
    expect(wrapper.getElement()).toBeNull();
  });

  it("calls fetchConceptFilters when component mounts but not when it unmounts", () => {
    const fetchConceptFilters = jest.fn();
    const props = {
      clearConceptFilters,
      fetchConceptFilters,
      conceptFiltersLoading
    };
    jest.spyOn(ConceptFiltersLoader.prototype, "componentDidMount");
    const wrapper = shallow(<ConceptFiltersLoader {...props} />);
    expect(
      ConceptFiltersLoader.prototype.componentDidMount.mock.calls.length
    ).toBe(1);
    expect(fetchConceptFilters.mock.calls.length).toBe(1);
    wrapper.unmount();
    expect(fetchConceptFilters.mock.calls.length).toBe(1);
  });

  it("calls clearConceptFilters when component unmounts but not when it mounts", () => {
    const clearConceptFilters = jest.fn();
    const props = {
      clearConceptFilters,
      fetchConceptFilters,
      conceptFiltersLoading
    };
    jest.spyOn(ConceptFiltersLoader.prototype, "componentWillUnmount");
    const wrapper = shallow(<ConceptFiltersLoader {...props} />);
    expect(clearConceptFilters.mock.calls.length).toBe(0);
    wrapper.unmount();
    expect(
      ConceptFiltersLoader.prototype.componentWillUnmount.mock.calls.length
    ).toBe(1);
    expect(clearConceptFilters.mock.calls.length).toBe(1);
  });
});

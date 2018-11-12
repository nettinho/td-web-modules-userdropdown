import React from "react";
import { shallow } from "enzyme";
import { ConceptArchiveLoader } from "../ConceptArchiveLoader";

describe("<ConceptArchiveLoader />", () => {
  const conceptArchiveLoading = false;
  const fetchConceptArchive = jest.fn();
  const clearConceptArchive = jest.fn();
  const match = { params: { id: 1 } };

  it("matches the latest snapshot", () => {
    const conceptArchiveLoading = false;
    const props = {
      clearConceptArchive,
      fetchConceptArchive,
      conceptArchiveLoading,
      match
    };
    const wrapper = shallow(<ConceptArchiveLoader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a loader if conceptArchiveLoading is true", () => {
    const conceptArchiveLoading = true;
    const props = {
      clearConceptArchive,
      fetchConceptArchive,
      conceptArchiveLoading,
      match
    };
    const wrapper = shallow(<ConceptArchiveLoader {...props} />);
    expect(wrapper.find("Loading").length).toBe(1);
  });

  it("renders null if conceptArchiveLoading is false", () => {
    const conceptArchiveLoading = false;
    const props = {
      clearConceptArchive,
      fetchConceptArchive,
      conceptArchiveLoading,
      match
    };
    const wrapper = shallow(<ConceptArchiveLoader {...props} />);
    expect(wrapper.getElement()).toBeNull();
  });

  it("calls fetchConceptArchive when component mounts but not when it unmounts", () => {
    const fetchConceptArchive = jest.fn();
    const props = {
      clearConceptArchive,
      fetchConceptArchive,
      conceptArchiveLoading,
      match
    };
    jest.spyOn(ConceptArchiveLoader.prototype, "componentDidMount");
    const wrapper = shallow(<ConceptArchiveLoader {...props} />);
    expect(
      ConceptArchiveLoader.prototype.componentDidMount.mock.calls.length
    ).toBe(1);
    expect(fetchConceptArchive.mock.calls.length).toBe(1);
    wrapper.unmount();
    expect(fetchConceptArchive.mock.calls.length).toBe(1);
  });

  it("calls clearConceptArchive when component unmounts but not when it mounts", () => {
    const clearConceptArchive = jest.fn();
    const props = {
      clearConceptArchive,
      fetchConceptArchive,
      conceptArchiveLoading,
      match
    };
    jest.spyOn(ConceptArchiveLoader.prototype, "componentWillUnmount");
    const wrapper = shallow(<ConceptArchiveLoader {...props} />);
    expect(clearConceptArchive.mock.calls.length).toBe(0);
    wrapper.unmount();
    expect(
      ConceptArchiveLoader.prototype.componentWillUnmount.mock.calls.length
    ).toBe(1);
    expect(clearConceptArchive.mock.calls.length).toBe(1);
  });
});

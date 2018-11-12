import React from "react";
import { shallow } from "enzyme";
import { ConceptLoader } from "../ConceptLoader";

describe("<ConceptLoader />", () => {
  const conceptLoading = false;
  const fetchConcept = jest.fn();
  const clearConcept = jest.fn();
  const match = { params: { id: 1 } };

  it("matches the latest snapshot", () => {
    const conceptLoading = true;
    const props = { clearConcept, fetchConcept, conceptLoading, match };
    const wrapper = shallow(<ConceptLoader {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders a loader if conceptLoading is true", () => {
    const conceptLoading = true;
    const props = { clearConcept, fetchConcept, conceptLoading, match };
    const wrapper = shallow(<ConceptLoader {...props} />);
    expect(wrapper.find("Loading").length).toBe(1);
  });

  it("renders null if conceptLoading is false", () => {
    const props = { clearConcept, fetchConcept, conceptLoading, match };
    const wrapper = shallow(<ConceptLoader {...props} />);
    expect(wrapper.getElement()).toBeNull();
  });

  it("calls fetchConcept when component mounts but not when it unmounts", () => {
    const fetchConcept = jest.fn();
    const props = { clearConcept, fetchConcept, conceptLoading, match };
    jest.spyOn(ConceptLoader.prototype, "componentDidMount");
    const wrapper = shallow(<ConceptLoader {...props} />);
    expect(ConceptLoader.prototype.componentDidMount.mock.calls.length).toBe(1);
    expect(fetchConcept.mock.calls.length).toBe(1);
    wrapper.unmount();
    expect(fetchConcept.mock.calls.length).toBe(1);
  });

  it("calls clearConcept when component unmounts but not when it mounts", () => {
    const clearConcept = jest.fn();
    const props = { clearConcept, fetchConcept, conceptLoading, match };
    jest.spyOn(ConceptLoader.prototype, "componentWillUnmount");
    const wrapper = shallow(<ConceptLoader {...props} />);
    expect(clearConcept.mock.calls.length).toBe(0);
    wrapper.unmount();
    expect(ConceptLoader.prototype.componentWillUnmount.mock.calls.length).toBe(
      1
    );
    expect(clearConcept.mock.calls.length).toBe(1);
  });
});

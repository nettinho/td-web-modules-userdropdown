import { lineageForm } from "..";
import {
  LINEAGE_CLEAN_STATE,
  REQUEST_ELEMENTS_BY_LEVEL_FAILED,
  REQUEST_ELEMENTS_BY_LEVEL_RECEIVED,
  REQUEST_ELEMENTS_BY_LEVEL
} from "../../constants";

describe("reducers: lineageForm", () => {
  const initialStateForm = {
    listSelectElements: [],
    isLoading: false
  };

  const data = [{ uuid: "ID1", name: "ElementTitle", labels: ["Group"] }];

  const dataResponse = [
    {
      id: "ID1",
      key: 0,
      value: "ID1",
      label: "ElementTitle",
      disabled: false
    }
  ];

  const listSelectElements = [
    {
      key: "SelectElement-0",
      bottomLevel: false,
      children: dataResponse
    }
  ];

  it("should provide the initial state", () => {
    expect(lineageForm(undefined, {})).toEqual(initialStateForm);
  });

  it("should handle LINEAGE_CLEAN_STATE", () => {
    expect(
      lineageForm({ foo: "bar" }, { type: LINEAGE_CLEAN_STATE })
    ).toMatchObject(initialStateForm);
  });

  it("should handle REQUEST_ELEMENTS_BY_LEVEL", () => {
    expect(
      lineageForm({ foo: "bar" }, { type: REQUEST_ELEMENTS_BY_LEVEL })
    ).toHaveProperty("isLoading", true);
  });

  it("should handle REQUEST_ELEMENTS_BY_LEVEL_FAILED", () => {
    expect(
      lineageForm({ foo: "bar" }, { type: REQUEST_ELEMENTS_BY_LEVEL_FAILED })
    ).toHaveProperty("isLoading", false);
  });

  it("should handle REQUEST_ELEMENTS_BY_LEVEL_RECEIVED for the initialState", () => {
    const currentLevel = undefined;
    const uuidElement = 1;
    expect(
      lineageForm(initialStateForm, {
        type: REQUEST_ELEMENTS_BY_LEVEL_RECEIVED,
        uuidElement,
        currentLevel,
        data: { data }
      })
    ).toMatchObject({ listSelectElements: listSelectElements });
  });

  it("should handle REQUEST_ELEMENTS_BY_LEVEL_RECEIVED for an state different from the initialState", () => {
    const currentLevel = 0;
    const uuidElement = 2;

    const newState = {
      listSelectElements: listSelectElements,
      isLoading: true,
      listSelectedResources: []
    };

    const listSelectElementsResponse = [
      {
        key: "SelectElement-0",
        bottomLevel: false,
        children: dataResponse
      },
      {
        key: "SelectElement-1",
        bottomLevel: false,
        children: dataResponse
      }
    ];

    expect(
      lineageForm(newState, {
        type: REQUEST_ELEMENTS_BY_LEVEL_RECEIVED,
        uuidElement,
        currentLevel,
        data: { data }
      })
    ).toMatchObject({ listSelectElements: listSelectElementsResponse });
  });
});

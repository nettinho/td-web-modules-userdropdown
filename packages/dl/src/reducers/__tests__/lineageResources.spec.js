import { lineageResources } from "..";
import {
  CLEAN_RESOURCES_LIST,
  LINEAGE_CLEAN_STATE,
  LINEAGE_VISUALIZATION,
  REDIRECT_TO_VISUALIZATION,
  SET_RESOURCES_LIST
} from "../../constants";

describe("reducers: lineageResources", () => {
  const initialStateResources = {
    listSelectedResources: [],
    redirectToVisualization: false,
    typeVisualization: ""
  };

  it("should provide the initial state", () => {
    expect(lineageResources(undefined, {})).toEqual(initialStateResources);
  });

  it("should handle LINEAGE_CLEAN_STATE", () => {
    expect(
      lineageResources({ foo: "bar" }, { type: LINEAGE_CLEAN_STATE })
    ).toMatchObject(initialStateResources);
  });

  it("should handle CLEAN_RESOURCES_LIST", () => {
    expect(
      lineageResources({ foo: "bar" }, { type: CLEAN_RESOURCES_LIST })
    ).toMatchObject({ listSelectedResources: [] });
  });

  const listUuids = [12, 72, 68];

  it("should handle SET_RESOURCES_LIST if listUuids is not empty", () => {
    expect(
      lineageResources(initialStateResources, {
        listUuids: listUuids,
        type: SET_RESOURCES_LIST
      })
    ).toMatchObject({ listSelectedResources: listUuids });
  });

  it("should handle SET_RESOURCES_LIST if listUuids is empty", () => {
    expect(
      lineageResources(initialStateResources, {
        listUuids: [],
        type: SET_RESOURCES_LIST
      })
    ).toMatchObject({ listSelectedResources: [] });
  });

  it("should handle REDIRECT_TO_VISUALIZATION", () => {
    const typeVisualization = LINEAGE_VISUALIZATION;
    expect(
      lineageResources(initialStateResources, {
        type: REDIRECT_TO_VISUALIZATION,
        typeVisualization
      })
    ).toMatchObject({ redirectToVisualization: true, typeVisualization });
  });
});

import { clearRedirect } from "@truedat/core/routines";
import { createGroup, deleteGroup, updateGroup } from "../../routines";
import { groupRedirect } from "..";

describe("reducers: groupRedirect", () => {
  const payload = {};
  const initialState = "";

  it("should provide the initial state", () => {
    expect(groupRedirect(undefined, {})).toEqual("");
  });

  it("should handle the clearRedirect.TRIGGER action", () => {
    expect(groupRedirect("foo", { type: clearRedirect.TRIGGER })).toEqual(
      initialState
    );
  });

  it("should handle the createGroup.SUCCESS action", () => {
    expect(groupRedirect("foo", { type: createGroup.SUCCESS })).toEqual(
      "/groups"
    );
  });

  it("should handle the deleteGroup.SUCCESS action", () => {
    expect(groupRedirect("foo", { type: deleteGroup.SUCCESS })).toEqual(
      "/groups"
    );
  });

  it("should handle the updateGroup.SUCCESS action", () => {
    expect(groupRedirect("foo", { type: updateGroup.SUCCESS })).toEqual(
      "/groups"
    );
  });

  it("should ignore unknown actions", () => {
    expect(groupRedirect("foo", { type: "bar", payload })).toEqual("foo");
  });
});

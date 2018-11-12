import { clearRedirect } from "@truedat/core/routines";
import { createUser, deleteUser, updateUser } from "../../routines";
import { userRedirect } from "..";

describe("reducers: userRedirect", () => {
  const payload = {};
  const initialState = "";

  it("should provide the initial state", () => {
    expect(userRedirect(undefined, {})).toEqual("");
  });

  it("should handle the clearRedirect.TRIGGER action", () => {
    expect(userRedirect("foo", { type: clearRedirect.TRIGGER })).toEqual(
      initialState
    );
  });

  it("should handle the createUser.SUCCESS action", () => {
    expect(userRedirect("foo", { type: createUser.SUCCESS })).toEqual("/users");
  });

  it("should handle the deleteUser.SUCCESS action", () => {
    expect(userRedirect("foo", { type: deleteUser.SUCCESS })).toEqual("/users");
  });

  it("should handle the updateUser.SUCCESS action", () => {
    expect(userRedirect("foo", { type: updateUser.SUCCESS })).toEqual("/users");
  });

  it("should ignore unknown actions", () => {
    expect(userRedirect("foo", { type: "bar", payload })).toEqual("foo");
  });
});

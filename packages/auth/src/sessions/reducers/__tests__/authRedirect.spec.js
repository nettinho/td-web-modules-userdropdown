import { clearRedirect } from "@truedat/core/routines";
import { auth0Login, openIdLogin } from "../../routines";
import { authRedirect } from "..";

const initialState = "";
const fooState = { foo: "bar" };

describe("reducers: authRedirect", () => {
  it("should provide the initial state", () => {
    expect(authRedirect(undefined, {})).toEqual(initialState);
  });

  it("should handle the clearRedirect.TRIGGER action", () => {
    expect(authRedirect(fooState, { type: clearRedirect.TRIGGER })).toEqual(
      initialState
    );
  });

  it("should handle the auth0Login.FAILURE action", () => {
    expect(authRedirect(fooState, { type: auth0Login.FAILURE })).toEqual(
      "/login"
    );
  });

  it("should handle the auth0Login.SUCCESS action", () => {
    expect(authRedirect(fooState, { type: auth0Login.SUCCESS })).toEqual("/");
  });

  it("should handle the openIdLogin.FAILURE action", () => {
    expect(authRedirect(fooState, { type: openIdLogin.FAILURE })).toEqual(
      "/login"
    );
  });

  it("should handle the openIdLogin.SUCCESS action", () => {
    expect(authRedirect(fooState, { type: openIdLogin.SUCCESS })).toEqual("/");
  });

  it("should ignore unknown actions", () => {
    expect(authRedirect(fooState, { type: "FOO" })).toBe(fooState);
  });
});

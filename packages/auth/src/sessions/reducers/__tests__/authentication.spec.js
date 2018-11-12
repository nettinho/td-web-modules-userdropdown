import { authentication, loginSubmitting } from "../../reducers";
import { login } from "../../routines";
import { RECEIVE_LOGOUT, RECEIVE_TOKEN } from "../../actions";

const fooState = { foo: "bar" };

describe("reducers: loginSubmitting", () => {
  it("should provide the initial state", () => {
    expect(loginSubmitting(undefined, {})).toBe(false);
  });

  it("should be true after receiving the TRIGGER action", () => {
    expect(loginSubmitting(false, { type: login.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the FULFILL action", () => {
    expect(loginSubmitting(true, { type: login.FULFILL })).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(loginSubmitting(fooState, { type: "FOO" })).toBe(fooState);
  });
});

describe("reducers: authentication", () => {
  const initialState = {
    token: undefined,
    is_admin: false,
    has_permissions: false
  };
  it("should provide the initial state", () => {
    expect(authentication(undefined, {})).toEqual(initialState);
  });

  it("should handle the SUCCESS action", () => {
    const payload = { token: "TOKEN", refresh_token: "REFRESH" };
    expect(
      authentication({ foo: "bar" }, { type: login.SUCCESS, payload })
    ).toMatchObject({ token: "TOKEN" });
  });

  it("should handle the FAILURE action", () => {
    expect(authentication({ foo: "bar" }, { type: login.FAILURE })).toEqual(
      initialState
    );
  });

  it("should handle the RECEIVE_LOGOUT action", () => {
    expect(authentication({ foo: "bar" }, { type: RECEIVE_LOGOUT })).toEqual(
      initialState
    );
  });

  it("should handle the RECEIVE_TOKEN action", () => {
    expect(
      authentication({ foo: "bar" }, { type: RECEIVE_TOKEN, token: "token" })
    ).toHaveProperty("token");
  });

  it("should ignore unknown actions", () => {
    expect(authentication({ foo: "bar" }, { type: "WTF" })).toEqual({
      foo: "bar"
    });
  });
});

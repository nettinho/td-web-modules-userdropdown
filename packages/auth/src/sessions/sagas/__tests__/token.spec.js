import jwt_decode from "jwt-decode";
import { testSaga } from "redux-saga-test-plan";
import {
  tokenRequestSaga,
  checkExpired,
  readToken,
  readTokenFromStorage
} from "..";
import { REQUEST_TOKEN, RECEIVE_TOKEN } from "../../actions";

describe("sagas: read token from storage", () => {
  it("should read the token from local storage", () => {
    readTokenFromStorage();
    expect(localStorage.getItem).toHaveBeenCalledWith("td_access_token");
  });
});

describe("sagas: check expired", () => {
  const now = Date.now().valueOf() / 1000;
  const oneMinuteAgo = now - 60;
  const oneMinuteFromNow = now + 60;

  it("should be false if argument is falsy", () => {
    expect(checkExpired(null)).toBeFalsy();
    expect(checkExpired(undefined)).toBeFalsy();
    expect(checkExpired(false)).toBeFalsy();
    expect(checkExpired(now - 100)).toBeTruthy();
    expect(checkExpired(now + 10000)).toBeFalsy();
  });

  it("should be true if expiry is before current time", () => {
    expect(checkExpired(oneMinuteAgo)).toBeTruthy();
  });

  it("should be false if expiry is after current time", () => {
    expect(checkExpired(oneMinuteFromNow)).toBeFalsy();
  });
});

describe("sagas: read token", () => {
  const exp = Date.now().valueOf() / 1000 + 60;
  const user_name = "user";
  const token = "TOKEN";
  const is_admin = false;
  const has_permissions = false;

  it("should call readTokenFromStorage, jwt_decode and checkExpired", () => {
    expect(() => {
      testSaga(readToken)
        .next()
        .call(readTokenFromStorage)
        .next(token)
        .call(jwt_decode, token)
        .next({ user_name, exp, is_admin, has_permissions })
        .call(checkExpired, exp)
        .next(false)
        .put({
          type: RECEIVE_TOKEN,
          user_name,
          token,
          is_admin,
          has_permissions
        })
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should complete if token is expired", () => {
    expect(() => {
      testSaga(readToken)
        .next()
        .call(readTokenFromStorage)
        .next(token)
        .call(jwt_decode, token)
        .next({ user_name, exp })
        .call(checkExpired, exp)
        .next(true)
        .isDone();
    }).not.toThrow();
  });

  it("should complete if token is falsy", () => {
    expect(() => {
      testSaga(readToken)
        .next()
        .call(readTokenFromStorage)
        .next(undefined)
        .isDone();
    }).not.toThrow();
  });
});

describe("sagas: token request", () => {
  it("should success handling tokenRequestSaga", () => {
    expect(() => {
      testSaga(tokenRequestSaga)
        .next()
        .takeLatestEffect(REQUEST_TOKEN, readToken)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should fail handling tokenRequestSaga if wrong pattern", () => {
    expect(() => {
      testSaga(tokenRequestSaga)
        .next()
        .takeLatestEffect("WTF_PATTERN", readToken);
    }).toThrow();
  });
});

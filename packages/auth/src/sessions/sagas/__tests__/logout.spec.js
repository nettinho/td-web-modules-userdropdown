import { testSaga } from "redux-saga-test-plan";
import { logout, logoutRequestSaga, clearToken } from "../../sagas";
import { REQUEST_LOGOUT, RECEIVE_LOGOUT } from "../../actions";

describe("sagas: clear token", () => {
  it("should clear the token from local storage", () => {
    clearToken();
    expect(localStorage.removeItem).toHaveBeenCalled();
  });
});

describe("sagas: logout request", () => {
  it("should success handling loginRequestSaga", () => {
    expect(() => {
      testSaga(logoutRequestSaga)
        .next()
        .takeLatestEffect(REQUEST_LOGOUT, logout)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should fail handling logoutRequestSaga if wrong pattern", () => {
    expect(() => {
      testSaga(logoutRequestSaga)
        .next()
        .takeLatestEffect("WTF_PATTERN", logout);
    }).toThrow();
  });
});

describe("sagas: logout", () => {
  it("should call clearToken", () => {
    expect(() => {
      testSaga(logout)
        .next()
        .call(clearToken)
        .next()
        .put({ type: RECEIVE_LOGOUT })
        .next()
        .isDone();
    }).not.toThrow();
  });
});

import jwt_decode from "jwt-decode";
import { testSaga } from "redux-saga-test-plan";
import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { login, auth0Login, openIdLogin } from "../../routines";
import {
  auth0LoginSaga,
  openIdLoginSaga,
  postLoginSaga,
  loginRequestSaga,
  saveToken
} from "..";
import { API_SESSIONS } from "../../api";
import { takeLatest } from "redux-saga/effects";

describe("sagas: save token", () => {
  const token = "TOKEN";
  it("should save the token in local storage", () => {
    saveToken(token);
    expect(localStorage.setItem).toHaveBeenCalledWith("td_access_token", token);
  });
});

describe("sagas: login request", () => {
  it("should success handling loginRequestSaga", () => {
    expect(() => {
      testSaga(loginRequestSaga)
        .next()
        .all([
          takeLatest(login.TRIGGER, postLoginSaga),
          takeLatest(auth0Login.TRIGGER, auth0LoginSaga),
          takeLatest(openIdLogin.TRIGGER, openIdLoginSaga)
        ])
        .finish()
        .isDone();
    }).not.toThrow();
  });
});

describe("sagas: post login", () => {
  it("should handle postLoginSaga when a response is returned", () => {
    const user_name = "fulanito.menganito@bluetab.net";
    const password = "top_secret";
    const token = "token";
    const has_permissions = true;
    const token_username = "some_username";
    const token_is_admin = false;
    const type = "type";
    const exp = "exp";
    const user = { user_name, password };
    const data = { token };

    expect(() => {
      testSaga(postLoginSaga, { payload: user })
        .next()
        .put(login.request())
        .next()
        .call(apiJsonPost, API_SESSIONS, { user }, JSON_OPTS)
        .next({ data })
        .call(saveToken, token)
        .next()
        .call(jwt_decode, token)
        .next({
          user_name: token_username,
          is_admin: token_is_admin,
          has_permissions,
          type,
          exp
        })
        .put(
          login.success({
            user_name: token_username,
            token,
            is_admin: token_is_admin,
            has_permissions,
            type,
            exp
          })
        )
        .next()
        .put(login.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should handle postLoginSaga when the call returns an error", () => {
    const username = "fulanito.menganito@bluetab.net";
    const password = "top_secret";

    const user = { user_name: username, password };
    const message = "Login failed";
    const error = { message };

    expect(() => {
      testSaga(postLoginSaga, { payload: user })
        .next()
        .put(login.request())
        .next()
        .call(apiJsonPost, API_SESSIONS, { user }, JSON_OPTS)
        .throw(error)
        .put(login.failure(message))
        .next()
        .put(login.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});

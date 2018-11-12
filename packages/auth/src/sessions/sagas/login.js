import _ from "lodash/fp";
import jwt_decode from "jwt-decode";
import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { login, auth0Login, openIdLogin } from "../routines";
import { API_SESSIONS } from "../api";
import { all, call, put, takeLatest } from "redux-saga/effects";

export function saveToken(token) {
  // TODO: Access token should be in a secure cookie instead of local storage
  localStorage.setItem("td_access_token", token);
}

export function* auth0LoginSaga({ payload }) {
  const access_token = payload;
  yield put(auth0Login.request(payload));
  try {
    const url = API_SESSIONS;
    const json_opts = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${access_token}`
      }
    };
    const { data } = yield call(apiJsonPost, url, {}, json_opts);
    const { token } = data;
    yield call(saveToken, token);
    const { user_name, has_permissions, type, exp, is_admin } = yield call(
      jwt_decode,
      token
    );
    yield put(
      auth0Login.success({
        user_name,
        type,
        exp,
        has_permissions,
        is_admin,
        ...data
      })
    );
  } catch (error) {
    yield put(auth0Login.failure(error.message));
  } finally {
    yield put(auth0Login.fulfill());
  }
}

export function* openIdLoginSaga({ payload }) {
  const { id_token, session_state, state } = payload;
  yield put(openIdLogin.request(payload));
  try {
    const url = API_SESSIONS;
    const json_opts = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: `Bearer ${id_token}`
      }
    };
    const body = { auth_realm: "oidc", session_state, state };
    const { data } = yield call(apiJsonPost, url, body, json_opts);
    const { token } = data;
    yield call(saveToken, token);
    const { user_name, has_permissions, type, exp, is_admin } = yield call(
      jwt_decode,
      token
    );
    yield put(
      openIdLogin.success({
        user_name,
        type,
        exp,
        has_permissions,
        is_admin,
        ...data
      })
    );
  } catch (error) {
    yield put(openIdLogin.failure(error.message));
  } finally {
    yield put(openIdLogin.fulfill());
  }
}

export function* postLoginSaga({ payload }) {
  try {
    const url = API_SESSIONS;
    const auth_realm = _.get("auth_realm")(payload);
    const user = _.pick(["user_name", "password"])(payload);
    const requestData = auth_realm ? { auth_realm, user } : { user };
    yield put(login.request());
    const { data } = yield call(apiJsonPost, url, requestData, JSON_OPTS);
    const { token } = data;
    yield call(saveToken, token);
    const { user_name, has_permissions, type, exp, is_admin } = yield call(
      jwt_decode,
      token
    );
    yield put(
      login.success({
        user_name,
        has_permissions,
        type,
        exp,
        is_admin,
        ...data
      })
    );
  } catch (error) {
    yield put(login.failure(error.message));
  } finally {
    yield put(login.fulfill());
  }
}

export function* loginRequestSaga() {
  yield all([
    takeLatest(login.TRIGGER, postLoginSaga),
    takeLatest(auth0Login.TRIGGER, auth0LoginSaga),
    takeLatest(openIdLogin.TRIGGER, openIdLoginSaga)
  ]);
}

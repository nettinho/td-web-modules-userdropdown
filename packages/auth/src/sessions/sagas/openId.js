import _ from "lodash/fp";
import jwt_decode from "jwt-decode";
import { apiJsonPost } from "@truedat/core/services/api";
import { openIdLogin } from "../routines";
import { API_SESSIONS } from "../api";
import { call, put } from "redux-saga/effects";

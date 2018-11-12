import axios from "./axios";

const JSON_OPTS = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};

const UPLOAD_JSON_OPTS = {
  headers: { "Content-Type": "multipart/form-data" }
};

const apiJson = (url, opts) =>
  axios.get(url, opts).then(({ data, headers }) => ({ data, headers }));

const apiJsonDelete = (url, opts) =>
  axios.delete(url, opts).then(({ data, headers }) => ({ data, headers }));

const apiJsonPatch = (url, data, opts) =>
  axios.patch(url, data, opts).then(({ data, headers }) => ({ data, headers }));

const apiJsonPost = (url, data, opts) => {
  return axios
    .post(url, data, opts)
    .then(({ data, headers }) => ({ data, headers }));
};
const apiJsonPut = (url, data, opts) =>
  axios.put(url, data, opts).then(({ data, headers }) => ({ data, headers }));

const apiJsonOptions = (url, opts) =>
  axios.options(url, opts).then(({ data, headers }) => ({ data, headers }));

export {
  apiJson,
  apiJsonDelete,
  apiJsonOptions,
  apiJsonPatch,
  apiJsonPost,
  apiJsonPut,
  axios,
  JSON_OPTS,
  UPLOAD_JSON_OPTS
};

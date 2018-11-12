import axios from "axios";

axios.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("td_access_token");
    if (token != null && !config.url.match(/\/sessions/)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

export default axios;

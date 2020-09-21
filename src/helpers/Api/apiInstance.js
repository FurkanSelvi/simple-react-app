import axios from 'axios'
import { store } from "../../store";

const baseURL = process.env.REACT_APP_BACKEND_HOST

export const apiInstance = (url) => axios.create({
  baseURL: url || `${baseURL}/api`
})

apiInstance().interceptors.request.use(function (config) {
  const state = store.getState();
  const authInfo = (state.auth && state.auth.information) || {};
  const lang = (state.i18nState && state.i18nState.lang) || "tr";
  const token = authInfo.token;
  if (token) {
    config.headers.Accept = 'application/json'
    config.headers.get["X-localization"] = lang;
    config.headers.post["X-localization"] = lang;
    config.headers.delete["X-localization"] = lang;
    config.headers.put["X-localization"] = lang;
  }
  return config
}, function (error) {
  return Promise.reject(error);
});

apiInstance().interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});

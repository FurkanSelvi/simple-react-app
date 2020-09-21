import { apiInstance } from "./apiInstance";

export const getPromise = (endpoint, params = {}, baseURL = null) => {
  return new Promise((resolve, reject) => {
    apiInstance(baseURL)
      .get(endpoint, params || {}, baseURL = null)
      .then((response) => resolve(response && response.data))
      .catch((error) => reject(error.response && error.response.data));
  });
};

export const postPromise = (endpoint, params = {}, baseURL = null) => {
  return new Promise((resolve, reject) => {
    apiInstance(baseURL)
      .post(endpoint, params)
      .then((response) => resolve(response && response.data))
      .catch((error) => reject(error.response && error.response.data));
  });
};

export const putPromise = (endpoint, params, baseURL = null) => {
  return new Promise((resolve, reject) => {
    apiInstance(baseURL)
      .put(endpoint, params || {})
      .then((response) => resolve(response))
      .catch((error) => reject(error.response && error.response.data));
  });
};

export const deletePromise = (endpoint, params, baseURL = null) => {
  return new Promise((resolve, reject) => {
    apiInstance(baseURL)
      .delete(endpoint, params || {})
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const getAsync = async (endpoint, params, baseURL = null) => {
  try {
    const response = await apiInstance(baseURL).get(endpoint, params || {});
    return response && response.data;
  } catch (error) {
    return error.response && error.response.data && error.response.data.error;
  }
};

export const postAsync = async (endpoint, params, baseURL = null) => {
  try {
    const response = await apiInstance(baseURL).post(endpoint, params || {});
    return response && response.data;
  } catch (error) {
    return error.response && error.response.data && error.response.data.error;
  }
};

export const putAsync = async (endpoint, params, baseURL = null) => {
  try {
    const response = await apiInstance(baseURL).put(endpoint, params || {});
    return response && response.data;
  } catch (error) {
    return error.response && error.response.data && error.response.data.error;
  }
};

export const deleteAsync = async (endpoint, params, baseURL = null) => {
  try {
    const response = await apiInstance(baseURL).delete(endpoint, params || {});
    return response && response.data;
  } catch (error) {
    return error.response && error.response.data && error.response.data.error;
  }
};

export const smPromiseAll = (urls, baseURL = null) => {
  let requests = []
  let result = []
  urls.forEach(url => {
    requests.push(apiInstance(baseURL).get(url))
  });
  return new Promise((resolve, reject) => {
    Promise.all(requests)
      .then(function (responses) {
        responses.forEach(response => result.push(response?.data?.data ?? []));
        resolve(result)
      })
      .catch(err => reject(err))
  })
}

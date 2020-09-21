import { AUTH_INFORMATION, AUTH_ADD_USER, AUTH_LOGOUT } from './types';

export const setAuthInfo = function (data) {
  return dispatch =>
    new Promise((resolve, reject) => {
      dispatch({
        type: AUTH_INFORMATION,
        payload: data,
      });
      resolve();
    });
};

export const addUser = function (data) {
  return dispatch =>
    new Promise((resolve, reject) => {
      dispatch({
        type: AUTH_ADD_USER,
        payload: data,
      });
      resolve('success');
    });
};

export const setLogout = data => ({
  type: AUTH_LOGOUT,
  payload: data,
});

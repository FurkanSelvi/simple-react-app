import { AUTH_INFORMATION, AUTH_ADD_USER, AUTH_LOGOUT } from "./types";
import { generateToken } from '../../helpers/utils'

const initialState = {
  information: {},
  users: [
    {
      username: 'username',
      password: 'username',
      userPermissions: [],
      token: generateToken()
    },
    {
      username: 'protected',
      password: 'protected',
      userPermissions: ['protectedHome'],
      token: generateToken()
    }
  ]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_INFORMATION:
      const information = { ...state.information, ...action.payload };
      return {
        ...state,
        information
      };
    case AUTH_ADD_USER:
      const users = [...state.users, ...action.payload];
      return {
        ...state,
        users
      };
    case AUTH_LOGOUT:
      return {
        ...initialState
      };
    default:
      return state;
  }
}

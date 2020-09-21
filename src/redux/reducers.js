import { combineReducers } from 'redux';

import {i18nState} from "redux-i18n"
import auth from './auth/reducer';
import {reducer as toastrReducer} from 'react-redux-toastr'

export default combineReducers({
  auth,
  toastr: toastrReducer,
  i18nState
});

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist';
import {applyMiddleware, createStore} from 'redux';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import expireReducer from 'redux-persist-expire';

import authState from './redux/auth/reducer';
import rootReducer from './redux/reducers';

const persistedReducers = persistReducer(
  {
    key: 'reactApp:root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    transforms: [
      expireReducer('auth', {
        expireSeconds: 86400,
        expiredState: {...authState},
        autoExpire: true,
      }),
    ],
  },
  rootReducer,
);

export const store = createStore(persistedReducers, composeWithDevTools(applyMiddleware(thunk)));

export const persist = persistStore(store);

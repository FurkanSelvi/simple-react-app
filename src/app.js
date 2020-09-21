import React from 'react';
import { Provider } from 'react-redux';
import I18n from 'redux-i18n';
import { translations } from './translations';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Launcher from './components/Launcher';
import { persist, store } from './store';
import AppRoutes from './router';

const App = () => (
  <Provider store={store}>
    <I18n translations={translations} initialLang="tr">
      <PersistGate loading={<Launcher />} persistor={persist}>
        <AppRoutes />
      </PersistGate>
    </I18n>
  </Provider>
);

export default App;

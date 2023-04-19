import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import  {store, persistor, sagaMiddleware} from "./store";
import rootSaga from "./store/sagas";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import "./i18n";

import "./assets/vendor/nucleo/css/nucleo.css";
// core styles
import "./assets/scss/argon-dashboard-pro-react.scss?v1.2.1";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
sagaMiddleware.run(rootSaga);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

reportWebVitals();

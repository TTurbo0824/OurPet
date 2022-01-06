import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import ScrollToTop from './components/ScrollTop';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
require('dotenv').config();

window.Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
        <ScrollToTop />
        <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
  , document.getElementById('root')
);

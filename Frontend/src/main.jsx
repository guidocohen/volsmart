import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store/reducers/rootReducer';
import { logger } from './middlewares';
import { App } from './pages/App';

const actionSanitizer = (action) =>
  action.type === 'FILE_DOWNLOAD_SUCCESS' && action.data
    ? { ...action, data: '<<LONG_BLOB>>' }
    : action;

const stateSanitizer = (state) =>
  state.data ? { ...state, data: '<<LONG_BLOB>>' } : state;

const root = ReactDOM.createRoot(document.getElementById('root'));

const isDevelopment = process.env.NODE_ENV === 'development';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: !isDevelopment }).concat(thunk, logger),
  devTools: {
    actionSanitizer,
    stateSanitizer,
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

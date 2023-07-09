import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import './index.css';
import App from './App';
import axios from 'axios';
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// if (process.env.NOVE_ENV === 'production') disableReactDevTools();

axios.defaults.withCredentials = true;

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
);


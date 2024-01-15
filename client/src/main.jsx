import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store.jsx';
import App from './App.jsx';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}> {/* Pass the Redux store to Provider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

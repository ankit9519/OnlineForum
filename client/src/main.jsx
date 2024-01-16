// Import the necessary dependencies from React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';

// Import the Provider component from React Redux to connect the Redux store to the application
import { Provider } from 'react-redux';

// Import the Redux store from the store file
import store from './redux/store.jsx';

// Import the main App component
import App from './App.jsx';

// Import the global styling for the application
import './index.css';

// Create a root for the React application using ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application wrapped in the Provider component to provide access to the Redux store
root.render(
  <Provider store={store}> {/* Pass the Redux store to Provider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

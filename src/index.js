import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./components/App";
import {DatabaseProvider} from "./contexts/DatabaseProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <DatabaseProvider>
          <App />
      </DatabaseProvider>
  </React.StrictMode>
);

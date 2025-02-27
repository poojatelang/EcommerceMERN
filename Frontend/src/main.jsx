import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store,{ persistor } from './redux/store';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
            
            
  </React.StrictMode>
);

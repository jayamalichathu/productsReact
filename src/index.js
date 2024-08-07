import React from 'react';
import {Provider} from "react-redux";

import ReactDOM from 'react-dom/client';

import App from './App';
import store from './stores/store';

if (process.env.NODE_ENV === 'production') { //disable console.logs in production environment
    console.log = () => {}
    console.error = () => {}
    console.debug = () => {}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

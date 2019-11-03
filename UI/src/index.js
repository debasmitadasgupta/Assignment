
  // frontend/src/index.js
  
  import React from 'react';
  import ReactDOM from 'react-dom';
  import 'bootstrap/dist/css/bootstrap.min.css';       // add this
  import './index.css';
  import App from './App';
  import {Provider} from 'react-redux';
  import configureStore from './Store/configureStore'
  import * as serviceWorker from './serviceWorker';
  import {BrowserRouter as Router} from 'react-router-dom';
  
  const store=configureStore();
  // ReactDOM.render(<App />, document.getElementById('root'));
   ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
  serviceWorker.unregister();
import React from 'react';
import registerServiceWorker from './registerServiceWorker';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './App';
import { Provider } from 'react-redux';
import store from './store';


ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
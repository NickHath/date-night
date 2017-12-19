import React from 'react';
import registerServiceWorker from './registerServiceWorker';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import App from './App';
import { Provider } from 'react-redux';
import store from './store';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#03a9f4',
    primary2Color: '#2a2c3b',
    accent1Color: '#03a9f4',
    pickerHeaderColor: '#e57455'
  },
});


ReactDOM.render(
  <BrowserRouter>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <App />
      </Provider>
    </MuiThemeProvider>
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
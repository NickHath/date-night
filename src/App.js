import React, { Component } from 'react';
import './sass/main.css';
import Landing from './components/Landing/Landing';
import DateResults from './components/DateResults/DateResults';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
        { routes }
      </div>
    );
  }
}

export default App;

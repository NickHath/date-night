import React, { Component } from 'react';
import './sass/main.css';
import Landing from './components/Landing/Landing';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Test Header</h1>
        <Landing/>
      </div>
    );
  }
}

export default App;

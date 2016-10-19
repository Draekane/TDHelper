import React, { Component } from 'react';
import Layout from './app/containers/common/layout';
import '../src/app/sass/app.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout />
      </div>
    );
  }
}

export default App;

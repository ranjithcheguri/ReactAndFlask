import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
          <div>
            <Menu />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;

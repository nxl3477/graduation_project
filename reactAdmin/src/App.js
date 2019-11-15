import React, { Component } from 'react';
import { Provider } from "react-redux";
import MyRoute from './route'
import store from './store'
import './App.scss';


class App extends Component {
  render() {
    return (
      <div className="container">
        <Provider store={store}>
          <MyRoute />
        </Provider>
      </div>
    );
  }
}

export default App;

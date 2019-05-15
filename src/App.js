import React, { Component } from 'react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import Reducer from './reducer/Reducer';
import Weather from './Component/Weather';

const store = createStore(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


class Main extends Component {
  render() { 
    return ( 
      <Provider store = {store}>
        <Weather />
      </Provider>
     );
  }
}

export default Main;
 

import React, { useState } from 'react';
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "./redux/rootReducer";
const store = createStore(rootReducer, composeWithDevTools());



ReactDOM.render(
  <Provider store={store}>  
      <App />
  </Provider>
  ,
  document.getElementById("root")
);



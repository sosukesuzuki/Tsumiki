import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import "normalize.css";
import "@babel/polyfill";
import store from "./lib/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(".root")
);

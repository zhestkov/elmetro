import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "mobx-react";
import { App } from "./components/App";
import history from "./service/history";
import * as stores from "./stores";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

ReactDOM.render(
  <div>
    <Router history={history}>
      <Provider history={history} {...stores}>
        <App />
      </Provider>
    </Router>
  </div>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

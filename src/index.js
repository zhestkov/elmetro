import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Router } from "react-router-dom";
import { Provider } from "mobx-react";
import { App } from "./components/App";
import history from "./utils/history";
import * as stores from "./stores";

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Router history={history}>
        <Provider history={history} {...stores}>
          <App />
        </Provider>
      </Router>
    </AppContainer>,
    document.getElementById("root")
  );
};
render();

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./", () => {
    render();
  });
}

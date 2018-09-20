// @flow
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Container from "./Common/Container";
import { Pages } from "../stores/Pages";

export class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/:page" component={Container} />
        <Redirect to={`/${Pages.PAGE_REG_INFO}`} />
      </Switch>
    );
  }
}

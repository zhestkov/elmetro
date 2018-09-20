// @flow
import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("history")
@observer
export class InfoPage extends Component {
  render() {
    return <div>Info Page</div>;
  }
}

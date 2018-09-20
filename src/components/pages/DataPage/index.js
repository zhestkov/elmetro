// @flow
import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import * as styles from "./styles.css";

@inject("history")
@observer
export class DataPage extends Component {
  render() {
    return <div>Data Page</div>;
  }
}

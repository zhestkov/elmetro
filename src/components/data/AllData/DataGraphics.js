// @flow
import React, { Component, Fragment } from "react";
import { observer, inject } from "mobx-react";
import { AllDataGraphicsTableModel } from "../../../models/tables/AllDataGraphicsTableModel";


@observer
export class DataGraphics extends Component {
  state = {
    graphicsTable: new AllDataGraphicsTableModel("all-graphics")
  };

  render() {
    return <div>Graphics</div>;
  }
}
// @flow
import React, { Component } from "react";
import { observer } from "mobx-react";
import { AllDataGraphicsTableModel } from "../../../models/tables/AllDataGraphicsTableModel";
import { AllDataTableModel } from "../../../models/tables/AllDataTableModel";
import { BaseTable } from "../../common/Table/BaseTable";

type Props = {
  model: AllDataTableModel
};

@observer
export class AllDataGraphics extends Component<Props> {
  state = {
    graphicsTable: new AllDataGraphicsTableModel("all-graphics")
  };

  columns = {
    // color: () => ()
  };

  renderTable() {
    return "Table";
  }

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

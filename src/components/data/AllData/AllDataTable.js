// @flow
import React from "react";
import { observer } from "mobx-react";
import { BaseTable } from "../../common/Table/BaseTable";
import { AllDataTableModel } from "../../../models/tables/AllDataTableModel";

type Props = {
  model: AllDataTableModel
};

@observer
export class AllDataTable extends React.Component<Props> {
  renderTable = () => {
    const { model } = this.props;
    model.setData(model.DataAdapter);
    return <BaseTable model={model} showPagination={false} />;
  };

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

// @flow
import React from "react";
import { observer } from "mobx-react";
import { BaseTable } from "../../common/Table/BaseTable";
import { AllDataTableModel } from "../../../models/tables/AllDataTableModel";

type Props = {
  model?: *,
  dataStore: *
};

@observer
export class AllDataTable extends React.Component<Props> {
  state = {
    dataTableModel: new AllDataTableModel("all-data")
  };

  componentWillUnmount() {
    console.log("AllDatTable: unmount");
  }

  renderTable = () => {
    const { dataTableModel } = this.state;
    const { dataStore } = this.props;
    this.state.dataTableModel.setData(dataStore.DataAdapter);
    return (
      <div>
        <BaseTable model={dataTableModel} showPagination={false} />
      </div>
    );
  };

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

// @flow
import React from "react";
import { observer } from "mobx-react";
import { BaseTable } from "../../common/Table/BaseTable";
import { AllDataTableModel } from "../../../models/tables/AllDataTableModel";
import { dataStore } from "../../../stores";

type Props = {
  model?: *
};

@observer
export class AllDataTable extends React.Component<Props> {
  state = {
    dataTableModel: new AllDataTableModel("all-data")
  };

  render() {
    const { dataTableModel } = this.state;
    const data = dataStore.DataAdapter;
    this.state.dataTableModel.setData(data);
    return (
      <div>
        <BaseTable model={dataTableModel} showPagination={false} />
      </div>
    );
  }
}

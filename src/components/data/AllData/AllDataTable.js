// @flow
import React from "react";
import { observer, inject } from "mobx-react";
import { BaseTable } from "../../common/Table/BaseTable";
import { AllDataTableModel } from "../../../models/tables/AllDataTableModel";

type Props = {
  model: *,
  data: *
};

@inject("enumStore", "dataStore")
@observer
export class AllDataTable extends React.Component<Props> {
  // columnsAdapter = () => {
  //   return this.props.dataStore.ColumnsAdopter;
  // };

  state = {
    dataTableModel: new AllDataTableModel("all-data")
  };

  render() {
    const { dataTableModel } = this.state;
    this.state.dataTableModel.setData(this.props.data);
    return (
      <div>
        <BaseTable model={dataTableModel} />
      </div>
    );
  }
}

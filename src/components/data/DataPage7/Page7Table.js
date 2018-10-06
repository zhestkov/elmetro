// @flow
import React from "react";
import { observer } from "mobx-react";
import { BaseTable } from "../../common/Table/BaseTable";
import { Page7TableModel } from "../../../models/tables/Page7TableModel";
import { dataStore } from "../../../stores";

type Props = {
  model?: *
};

@observer
export class Page7Table extends React.Component<Props> {
  state = {
    dataTableModel: new Page7TableModel("data-page-7")
  };

  renderDescription = () => {
    return (
      <div>
        <p>АВ – аналоговый вход</p>
        <p>АЕ – аналоговый выход</p>
        <p>ДВ – дискретный вход</p>
        <p>Р – дискретный выход</p>
        <p>СМ – сумматор</p>
      </div>
    );
  };

  render() {
    const { dataTableModel } = this.state;
    const data = dataStore.DataAdapter;
    this.state.dataTableModel.setData(data);
    return (
      <div>
        <BaseTable model={dataTableModel} showPagination={false} />
        {this.renderDescription()}
      </div>
    );
  }
}

// @flow
import React from "react";
import { observer, inject } from "mobx-react";
import { BaseTable } from "../../common/Table/BaseTable";
import { DataPageTableModel } from "../../../models/tables/DataPageTableModel";

type Props = {
  model: DataPageTableModel,
  channels: Array<*>
};

@inject("dataStore", "regStore")
@observer
export class TableTab extends React.Component<Props> {
  renderTable = () => {
    const { model, channels } = this.props;
    model.setData(channels);
    return <BaseTable model={model} showPagination={false} />;
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
    return (
      <div>
        {this.renderTable()}
        {this.renderDescription()}
      </div>
    );
  }
}

// @flow
import React from "react";
import { observer } from "mobx-react";
import { BaseTable } from "../../common/Table/BaseTable";
import { DataPageTableModel } from "../../../models/tables/DataPageTableModel";

type Props = {
  model: DataPageTableModel,
  data: Array<*>
};

@observer
export class TableTab extends React.Component<Props> {
  renderTable = () => {
    const { model } = this.props;
    const data = model.DataAdapter;
    model.setData(data);
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

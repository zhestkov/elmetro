// @flow
import React from "react";
import { observer } from "mobx-react";
import { BaseTable } from "../../common/Table/BaseTable";
import { DataPageTableModel } from "../../../models/tables/DataPageTableModel";
import { convertUnicode } from "../../../service/utils";

type Props = {
  model: DataPageTableModel,
  dataStore: *,
  regStore: *
};

const FETCHING_LABEL: string = "Загрузка данных...";

@observer
export class TableTab extends React.Component<Props> {
  getData = () => {
    const { regStore, dataStore, model } = this.props;
    if (dataStore.CurrentBufIndex < 0) {
      return null;
    }
    const data = [];
    const index = model.pageNumber - 1;
    const { regInfo, regConfig } = regStore;
    const { Pages } = regConfig.DisplayConfig;
    const channels = Pages[index].Channels.filter(ch => typeof ch === "object");

    for (let i = 0; i < channels.length; i++) {
      const { Source, Low, High } = channels[i];
      const dataArrName = `${Source.Type}Data`;
      const configArrName = `${Source.Type}Config`;
      const chInfoArrayName = `${Source.Type}ChannelInfo`;

      const signal = convertUnicode(
        regInfo.DeviceInfo[chInfoArrayName][Source.Index].Name
      );
      const value =
        dataStore.data[dataStore.CurrentBufIndex][dataArrName][Source.Index];
      const description = regConfig[configArrName][Source.Index].Desc;
      const units = regConfig[configArrName][Source.Index].Units;

      const row = {
        id: i + 1,
        signal,
        value: value || "",
        description,
        units,
        low: Low,
        high: High
      };
      data.push(row);
    }
    return data;
  };

  renderTable = () => {
    const data = this.getData();
    const { model } = this.props;
    model.setData(data);
    return <BaseTable model={model} showPagination={false} />;
  };

  renderDescription = () => {
    return (
      <div>
        <p>АВ, МВ, ЧВ - аналоговые входы</p>
        <p>АЕ – аналоговые выходы</p>
        <p>ДВ – дискретные входы</p>
        <p>Р – дискретные выходы</p>
        <p>СМ – сумматоры</p>
      </div>
    );
  };

  render() {
    const data = this.getData();
    if (data == null) {
      return <div>{FETCHING_LABEL}</div>;
    }
    return (
      <div>
        {this.renderTable()}
        {this.renderDescription()}
      </div>
    );
  }
}

// @flow
import { observable } from "mobx";
import { BaseTableModel } from "../BaseTableModel";

export class DataPageTableModel extends BaseTableModel {
  @observable pageNumber: number = 1;
  @observable total = 0;
  @observable pageSize = 1;

  constructor(id: string, pageNumber?: number) {
    super(id);
    this.pageNumber = pageNumber || Number(id.slice(id.indexOf("-") + 1));
  }

  @observable
  columns = [
    {
      field: "id",
      accessor: "id",
      Header: "№",
      width: 30
    },
    {
      field: "signal",
      Header: "Тип сигнала"
    },
    {
      field: "value",
      Header: "Значение"
    },
    {
      field: "units",
      Header: "Ед.изм."
    },
    {
      field: "description",
      Header: "Описание"
    },
    {
      field: "low",
      Header: "НПИ"
    },
    {
      field: "high",
      Header: "ВПИ"
    }
  ];

  // @computed
  // get DataAdapter() {
  //   const data = [];
  //   const index = this.pageNumber - 1;
  //   const { regInfo, regConfig } = regStore;
  //   const { Pages } = regConfig.DisplayConfig;
  //   const channels = Pages[index].Channels.filter(
  //     ch => ch != null && typeof ch !== "string"
  //   );
  //
  //   let row = {};
  //   for (let i = 0; i < channels.length; i++) {
  //     const { Source, Low, High } = channels[i];
  //     const dataArrName = `${Source.Type}Data`;
  //     const configArrName = `${Source.Type}Config`;
  //     const chInfoArrayName = `${Source.Type}ChannelInfo`;
  //
  //     const signal = convertUnicode(
  //       regInfo.DeviceInfo[chInfoArrayName][Source.Index].Name
  //     );
  //     const value =
  //       dataStore.data[dataStore.BufIndex][dataArrName][Source.Index];
  //     const description = regConfig[configArrName][Source.Index].Desc;
  //     const units = regConfig[configArrName][Source.Index].Units;
  //     row = {
  //       id: i + 1,
  //       signal,
  //       value: value || "",
  //       description,
  //       units,
  //       low: Low,
  //       high: High
  //     };
  //     data.push(row);
  //   }
  //   return data;
  // }
}

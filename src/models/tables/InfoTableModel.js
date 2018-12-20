// @flow
import { observable } from "mobx";
import { BaseTableModel } from "../BaseTableModel";

export class InfoTableModel extends BaseTableModel {
  @observable total = 0;
  @observable pageSize = 5;

  columns = [
    {
      Header: "Параметры",
      accessor: "attribute",
      width: 210
    },
    {
      Header: "Значения",
      accessor: "value",
      width: 200
    }
  ];
}

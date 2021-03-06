// @flow
import { observable } from "mobx";
import { BaseTableModel } from "../BaseTableModel";

export class SettingsTableModel extends BaseTableModel {
  @observable total = 3;
  @observable pageSize = 3;

  columns = [
    {
      id: "description",
      field: "description",
      accessor: "description",
      width: 280,
      Header: "Описание"
    },
    {
      id: "value",
      field: "value",
      accessor: "value",
      width: 300,
      Header: "Значение"
    }
  ];
}

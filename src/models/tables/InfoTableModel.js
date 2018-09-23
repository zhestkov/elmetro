// @flow
import { computed, action, observable } from "mobx";
import { BaseTableModel } from "../BaseTableModel";

export class InfoTableModel extends BaseTableModel {
  @observable total = 0;
  @observable pageSize = 5;

  @observable
  columns = [
    {
      Header: "Name",
      accessor: "name",
      width: 200
    },
    {
      Header: "Value",
      accessor: "value",
      width: 200
    }
  ];
}

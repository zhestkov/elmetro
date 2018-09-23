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
      accessor: "name"
    },
    {
      Header: "Value",
      accessor: "value"
    }
  ];
}

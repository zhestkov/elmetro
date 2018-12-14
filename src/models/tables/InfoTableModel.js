// @flow
import { observable } from "mobx";
import { BaseTableModel } from "../BaseTableModel";

export class InfoTableModel extends BaseTableModel {
  @observable total = 0;
  @observable pageSize = 5;

  columns = [
    {
      Header: "Attribute",
      accessor: "attribute",
      width: 170
    },
    {
      Header: "Value",
      accessor: "value",
      width: 220
    }
  ];
}

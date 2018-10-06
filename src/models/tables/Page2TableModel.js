// @flow
import { action, observable } from "mobx";
import { BaseTableModel } from "../BaseTableModel";

export class Page2TableModel extends BaseTableModel {
  @observable total = 0;
  @observable pageSize = 5;

  columns = [
    {
      Header: "Attribute",
      accessor: "attribute",
      width: 200
    },
    {
      Header: "Value",
      accessor: "value",
      width: 300
    }
  ];

  @action
  fetch = () => {
    console.log("Page2TableModel: fetching");
  };
}

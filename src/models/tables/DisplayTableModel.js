// @flow
import { action, observable } from "mobx";
import { BaseTableModel } from "../BaseTableModel";

export class DisplayTableModel extends BaseTableModel {
  @observable total = 0;
  @observable pageSize = 4;

  columns = [
    {
      id: "value_col_1",
      field: "value_col_1",
      accessor: "value_col_1",
      width: 150
    },
    {
      id: "value_col_2",
      field: "value_col_2",
      accessor: "value_col_2",
      width: 150
    },
    {
      id: "value_col_3",
      field: "value_col_3",
      accessor: "value_col_3",
      width: 150
    },
    {
      id: "value_col_4",
      field: "value_col_4",
      accessor: "value_col_4",
      width: 150
    }
  ];

  @action fetch = () => {};
}

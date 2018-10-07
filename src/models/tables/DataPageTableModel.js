// @flow
import { observable, computed } from "mobx";
import { BaseTableModel } from "../BaseTableModel";

export class DataPageTableModel extends BaseTableModel {
  @observable pageNumber: number = 1;
  @observable total = 1;
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
      Header: "№"
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

  @computed
  get DataAdapter() {
    const data = [];
    return data;
  }
}

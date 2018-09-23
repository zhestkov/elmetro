// @flow
import { action, computed, observable } from "mobx";

export class BaseTableModel {
  @observable id: string = "default";
  @observable isLoading: boolean = false;
  @observable data: Array = [];
  @observable columns: Array = [];
  @observable options: * = {};
  @observable page = 1;
  @observable pageSize = 10;
  @observable total = 1000;
  @observable sorted = {};
  @observable filters = {};

  constructor(id: string) {
    this.id = id;
    if (this.columns.length) {
      this.setColumns(this.columns);
    }
  }

  @action
  setColumns = columns => {
    this.columns = columns.map(col => ({
      ...col,
      accessor: col.accessor ? col.accessor : col.field,
      id: col.id ? col.id : col.field,
      isVisible: col.isVisible !== false
    }));
  };

  @action
  setTotal = total => {
    this.total = total || 0;
  };

  @action
  setData = data => {
    this.data = data;
  };

  @action
  setPage = page => {
    this.page = page || 1;
  };

  @computed
  get Data() {
    return this.data;
  }

  @computed
  get Columns() {
    return this.columns;
  }

  @action fetch = () => {};
}
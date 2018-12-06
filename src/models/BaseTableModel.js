// @flow
import { action, computed, observable } from "mobx";

export class BaseTableModel {
  @observable id: string = "default";
  @observable isLoading: boolean = false;
  data: Array = [];
  @observable columns: Array = [];
  @observable page = 1;
  @observable pageSize = 10;
  @observable total = 100;
  // @observable options: * = {};
  // @observable sorted = {};
  // @observable filters = {};

  constructor(id: string) {
    this.id = id;
    if (this.columns.length) {
      this.setColumns(this.columns);
    }
  }

  afterLoad(data) {
    return Promise.resolve(data);
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
    this.setPageSize(total);
  };

  @action
  setPageSize = size => {
    this.pageSize = size;
  };

  @action
  setData = data => {
    this.data = data;
    if (data.length) {
      this.setPageSize(data.length);
    }
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

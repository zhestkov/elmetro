// @flow
import React, { Component } from "react";
import ReactTable from "react-table";
import { toJS } from "mobx";
import "react-table/react-table.css";

type Props = {
  model: *,
  columns: [],
  onTrClick?: (e: *, data: *) => void
};

export class BaseTable extends Component<Props> {
  render() {
    const { model } = this.props;
    const data = model.Data || [];
    return (
      <ReactTable
        className="-striped -highlight"
        onFetchData={() => model.fetch()}
        data={data}
        columns={toJS(model.columns)}
        loading={model.isLoading}
        defaultPageSize={model.pageSize}
      />
    );
  }
}

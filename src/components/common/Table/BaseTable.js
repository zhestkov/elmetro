// @flow
import React, { Component } from "react";
import ReactTable from "react-table";

import * as styles from "./base-table.less";

type Props = {
  model: *,
  columns?: [],
  data?: [],
  customColumns?: *,
  onTrClick?: (e: *, data: *) => void,
  showPagination?: boolean
};

const DefaultCell = ({ text }) => (
  <span
    style={{
      display: "block"
      // overflow: "hidden",
      // textOverflow: "ellipsis"
    }}
  >
    {text}
  </span>
);

export class BaseTable extends Component<Props> {
  columnsAdapter() {
    const { customColumns, model } = this.props;
    return (
      model.Columns
        // .filter(col => col)
        .map(item => ({
          ...item,
          sortable: false,
          ...((customColumns &&
            customColumns[item.field] &&
            customColumns[item.field](item)) ||
            {})
        }))
        .map(item => ({
          ...item,
          Cell: ({ value, ...rest }) => (
            <div className={styles.cellWrapper}>
              {typeof item.Cell === "function" ? (
                item.Cell({ value, ...rest })
              ) : (
                <div className={item.alignRight ? styles.alignRight : null}>
                  <DefaultCell text={value} />
                </div>
              )}
            </div>
          )
        }))
    );
  }

  render() {
    const { model, ...rest } = this.props;
    const columns = this.columnsAdapter();
    return (
      <ReactTable
        className="-striped -highlight"
        // onFetchData={() => model.fetch()}
        data={this.props.data || model.Data || []}
        columns={columns}
        loading={model.isLoading}
        defaultPageSize={model.pageSize}
        {...rest}
      />
    );
  }
}

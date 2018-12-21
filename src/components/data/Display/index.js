// @flow
import React from "react";
import { observer, inject } from "mobx-react";
import { DisplayTableModel } from "../../../models/tables/DisplayTableModel";
import { BaseTable } from "../../common/Table/BaseTable";
import { convertUnicode } from "../../../service/utils";
import { DisplayTableCell } from "./DisplayTableCell";

import * as styles from "./DisplayTab.less";

type Props = {
  dataStore: *,
  regStore: *
};

type State = {
  displayTable: DisplayTableModel
};

inject("dataStore", "regStore");
@observer
export class DisplayTab extends React.Component<Props, State> {
  state = {
    displayTable: new DisplayTableModel("display-table")
  };

  columns = {
    value_col_1: () => ({
      Cell: ({ original }) => (
        <DisplayTableCell cell={original["value_col_1"]} />
      )
    }),

    value_col_2: () => ({
      Cell: ({ original }) => (
        <DisplayTableCell cell={original["value_col_2"]} />
      )
    }),

    value_col_3: () => ({
      Cell: ({ original }) => (
        <DisplayTableCell cell={original["value_col_3"]} />
      )
    }),

    value_col_4: () => ({
      Cell: ({ original }) => (
        <DisplayTableCell cell={original["value_col_4"]} />
      )
    })
  };

  getData = () => {
    const {
      dataStore,
      regStore: { regConfig, regInfo }
    } = this.props;
    const { displayTable } = this.state;
    if (dataStore.CurrentBufIndex < 0) {
      return null;
    }
    const data = [];
    const {
      Tablo: { Channels }
    } = regConfig.DisplayConfig;

    let currRowIndex = 0;
    let row = {};
    const numOfColumns = 4;
    const displayColumns = displayTable.Columns.map(col => col.id);

    for (let i = 0; i < Channels.length; i++) {
      if (typeof Channels[i] === "string") {
        row[displayColumns[currRowIndex]] = "-------";
        currRowIndex = (currRowIndex + 1) % numOfColumns;
        if (currRowIndex === 0) {
          data.push(row);
          row = {};
        }
        continue;
      }
      const {
        Low,
        High,
        Source: { Index, Type }
      } = Channels[i];
      const dataArrName = `${Type}Data`;
      const configArrName = `${Type}Config`;

      const chInfoArrayName = `${Type}ChannelInfo`;

      const signal = convertUnicode(
        regInfo.DeviceInfo[chInfoArrayName][Index].Name
      );

      const description = regConfig[configArrName][Index].Desc || "";
      const units = regConfig[configArrName][Index].Units || "";
      const value =
        dataStore.data[dataStore.CurrentBufIndex][dataArrName][Index];

      row[displayColumns[currRowIndex]] = {
        signal,
        description,
        units,
        value,
        low: Low,
        high: High
      };
      currRowIndex++;

      if (currRowIndex === numOfColumns) {
        data.push(row);
        row = {};
        currRowIndex = 0;
      }
    }
    return data;
  };

  renderTable = () => {
    const data = this.getData();
    return (
      <div className={styles.tableWrapper}>
        <BaseTable
          model={this.state.displayTable}
          data={data}
          showPagination={false}
          customColumns={this.columns}
        />
      </div>
    );
  };

  renderDescription = () => (
    <div className={styles.descriptionWrapper}>
      <p>АВ, МВ, ЧВ - аналоговые входы</p>
      <p>АЕ – аналоговые выходы</p>
      <p>ДВ – дискретные входы</p>
      <p>Р – дискретные выходы</p>
      <p>СМ – сумматоры</p>
    </div>
  );

  render() {
    return (
      <div className={styles.displayTabWrapper}>
        {this.renderTable()}
        {this.renderDescription()}
      </div>
    );
  }
}

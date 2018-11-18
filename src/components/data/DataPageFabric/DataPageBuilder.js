// @flow
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Tabs } from "antd";
import { DataPageTableModel } from "../../../models/tables/DataPageTableModel";
import { TableTab } from "./TableTab";
import { GraphicsTab } from "./GraphicsTab/GraphicsTab";

import * as styles from "./styles.css";
import { convertUnicode } from "../../../service/utils";

const tabsMap = [
  {
    label: "Table",
    Component: TableTab
  },
  {
    label: "Graphics",
    Component: GraphicsTab
  }
];

type Props = {
  id: string,
  tabsMap: [{ label: string, Component: React.Component }],
  dataStore: *,
  regStore: *
};

export function makeDataPage(pageNumber: number) {
  @inject("dataStore", "regStore")
  @observer
  class WrappedDataPage extends Component<Props> {
    state = {
      tableModel: new DataPageTableModel(`page-${pageNumber}`, pageNumber)
    };

    getData = () => {
      const { regStore, dataStore } = this.props;
      const data = [];
      const index = this.state.tableModel.pageNumber - 1;
      const { regInfo, regConfig } = regStore;
      const { Pages } = regConfig.DisplayConfig;
      const channels = Pages[index].Channels.filter(
        ch => ch != null && typeof ch !== "string"
      );

      let row = {};
      for (let i = 0; i < channels.length; i++) {
        const { Source, Low, High } = channels[i];
        const dataArrName = `${Source.Type}Data`;
        const configArrName = `${Source.Type}Config`;
        const chInfoArrayName = `${Source.Type}ChannelInfo`;

        const signal = convertUnicode(
          regInfo.DeviceInfo[chInfoArrayName][Source.Index].Name
        );
        const value =
          dataStore.data[dataStore.BufIndex][dataArrName][Source.Index];
        const description = regConfig[configArrName][Source.Index].Desc;
        const units = regConfig[configArrName][Source.Index].Units;
        row = {
          id: i + 1,
          signal,
          value: value || "",
          description,
          units,
          low: Low,
          high: High
        };
        data.push(row);
      }
      return data;
    };

    renderTab = (tab: *) => {
      const { label, Component } = tab;
      const data = this.getData();
      return (
        <Tabs.TabPane tab={`${label}`} key={`${label}`}>
          <Component model={this.state.tableModel} channels={data} />
        </Tabs.TabPane>
      );
    };

    render() {
      return (
        <div>
          <Tabs>{tabsMap.map(this.renderTab)}</Tabs>
        </div>
      );
    }
  }
  return WrappedDataPage;
}

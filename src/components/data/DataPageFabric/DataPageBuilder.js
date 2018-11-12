// @flow
import React, { Component } from "react";
import { Tabs } from "antd";
import { DataPageTableModel } from "../../../models/tables/DataPageTableModel";
import { TableTab } from "./TableTab";
import { GraphicsTab } from "./GraphicsTab/GraphicsTab";

import * as styles from "./styles.css";

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
  class WrappedDataPage extends Component<Props> {
    state = {
      tableModel: new DataPageTableModel(`page-${pageNumber}`, pageNumber)
    };

    renderTab = (tab: *) => {
      const { label, Component } = tab;
      return (
        <Tabs.TabPane tab={`${label}`} key={`${label}`}>
          <Component model={this.state.tableModel} />
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

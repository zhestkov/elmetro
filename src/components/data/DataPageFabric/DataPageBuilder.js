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
      tableModel: new DataPageTableModel(`page-${pageNumber}`, pageNumber),
      activeTabKey: "Table"
    };

    onChangeTab = (newTabKey: string): void => {
      this.setState({ activeTabKey: newTabKey });
    };

    renderTab = (tab: *) => {
      const { dataStore, regStore } = this.props;
      const { label, Component } = tab;
      return (
        <Tabs.TabPane tab={label} key={label}>
          {this.state.activeTabKey === label && (
            <Component
              model={this.state.tableModel}
              dataStore={dataStore}
              regStore={regStore}
            />
          )}
        </Tabs.TabPane>
      );
    };

    render() {
      return (
        <div>
          <Tabs
            defaultActiveKey={this.state.activeTabKey}
            onChange={this.onChangeTab}
          >
            {tabsMap.map(this.renderTab)}
          </Tabs>
        </div>
      );
    }
  }
  return WrappedDataPage;
}

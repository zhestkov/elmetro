// @flow
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Tabs } from "antd";
import { DataTabs } from "./DataTabs";

import * as styles from "./styles.css";

const TabPane = Tabs.TabPane;

@inject("history")
@observer
export class DataPage extends Component {
  renderTab = (type: *) => {
    const { label, Component } = DataTabs.getTab(type);
    return (
      <TabPane tab={`${label}`} key={type}>
        <Component />
      </TabPane>
    );
  };

  render() {
    const tabTypes = Object.keys(DataTabs.tabs);
    return (
      <div className={styles.pageContent}>
        <Tabs type="card">{tabTypes.map(this.renderTab)}</Tabs>
      </div>
    );
  }
}

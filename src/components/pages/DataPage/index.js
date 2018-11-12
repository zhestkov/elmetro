// @flow
import React, { Component } from "react";
import { inject } from "mobx-react";
import { Tabs } from "antd";
import { DataTabs } from "./DataTabs";

import * as styles from "./styles.css";

type Props = {
  dataStore: *,
  regStore?: *
};

const TabPane = Tabs.TabPane;

@inject("dataStore")
export class DataPage extends Component<Props> {
  componentDidMount() {
    const { dataStore } = this.props;
    dataStore.watchData();
  }

  componentWillUnmount() {
    const { dataStore } = this.props;
    dataStore.clearDataTimeout();
  }

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

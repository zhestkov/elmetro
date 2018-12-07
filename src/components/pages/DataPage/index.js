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

@inject("dataStore", "regStore")
export class DataPage extends Component<Props> {
  state = {
    activeTabKey: "ALL_DATA"
  };
  componentDidMount() {
    this.props.dataStore.watchData();
  }

  componentWillUnmount() {
    this.props.dataStore.clearDataTimeout();
  }

  onChangeTab = (newTabKey: string): void => {
    this.setState({ activeTabKey: newTabKey });
  };

  renderTab = (type: *) => {
    const { label, Component } = DataTabs.getTab(type);
    const { dataStore, regStore } = this.props;
    return (
      <TabPane tab={`${label}`} key={type}>
        {this.state.activeTabKey === type && (
          <Component dataStore={dataStore} regStore={regStore} />
        )}
      </TabPane>
    );
  };

  render() {
    const tabTypes = Object.keys(DataTabs.tabs);
    return (
      <div className={styles.pageContent}>
        <Tabs
          type="card"
          defaultActiveKey={this.state.activeTabKey}
          onChange={this.onChangeTab}
        >
          {tabTypes.map(this.renderTab)}
        </Tabs>
      </div>
    );
  }
}

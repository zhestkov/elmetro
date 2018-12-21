// @flow
import React, { Component } from "react";
import { inject } from "mobx-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { DataTabs } from "./DataTabs";
import { Controls } from "./Controls";

import "react-tabs/style/react-tabs.less";
import * as styles from "./data-page.less";

type Props = {
  dataStore: *,
  regStore: *
};

@inject("dataStore", "regStore")
export class DataPage extends Component<Props> {
  state = {
    activeTabKey: 0
  };

  componentDidMount() {
    const {
      dataStore,
      regStore: { regSettings }
    } = this.props;
    const numChartPointsLimit = Math.floor(
      (regSettings.DisplayIntervalHours * 3600) / regSettings.FetchPeriodSeconds
    );
    if (numChartPointsLimit !== dataStore.NumChartPointsLimit) {
      dataStore.updateChartLimits(numChartPointsLimit);
    }
    dataStore.watchData();
  }

  componentWillUnmount() {
    this.props.dataStore.clearDataTimeout();
  }

  onChangeTab = (newTabKey: number): void => {
    this.setState({ activeTabKey: newTabKey });
  };

  onPlayButton = () => {
    this.props.dataStore.watchData();
  };

  onStopButton = () => {
    this.props.dataStore.clearDataTimeout();
  };

  renderTabs = () => {
    const tabTypes = Object.keys(DataTabs.tabs);
    const { dataStore, regStore } = this.props;
    const labels = [];
    const components = [];
    tabTypes.forEach(type => {
      const { label, Component } = DataTabs.getTab(type);
      labels.push(label);
      components.push(Component);
    });

    return (
      <Tabs defaultIndex={0}>
        <div className={styles.tabsBar}>
          <Controls onPlay={this.onPlayButton} onStop={this.onStopButton} />
          <TabList>
            {labels.map((label, index) => <Tab key={index}>{label}</Tab>)}
          </TabList>
        </div>
        {components.map((Component, index) => (
          <TabPanel key={index}>
            <Component dataStore={dataStore} regStore={regStore} />
          </TabPanel>
        ))}
      </Tabs>
    );
  };

  render() {
    return <div className={styles.pageContent}>{this.renderTabs()}</div>;
  }
}

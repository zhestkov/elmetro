// @flow
import React, { Component } from "react";
import { inject } from "mobx-react";
import cn from "classnames";
import { Tabs } from "antd";
import { DataTabs } from "./DataTabs";

import { PlayButton } from "./Icons/PlayButton";
import { StopButton } from "./Icons/StopButton";

import * as styles from "./data-page.less";

type Props = {
  dataStore: *,
  regStore: *
};

const TabPane = Tabs.TabPane;

const controlButtons = {
  play: "play_button",
  stop: "stop_button"
};

@inject("dataStore", "regStore")
export class DataPage extends Component<Props> {
  state = {
    activeTabKey: "ALL_DATA",
    activeButton: controlButtons.play
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

  onChangeTab = (newTabKey: string): void => {
    this.setState({ activeTabKey: newTabKey });
  };

  onPlayButton = () => {
    this.setState({ activeButton: controlButtons.play });
    this.props.dataStore.watchData();
  };

  onStopButton = () => {
    this.setState({ activeButton: controlButtons.stop });
    this.props.dataStore.clearDataTimeout();
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
    const { activeButton } = this.state;
    const playClass = cn(
      "playButton",
      activeButton === controlButtons.play && "activeButton"
    );
    const stopClass = cn(
      "stopButton",
      activeButton === controlButtons.stop && "activeButton"
    );

    return (
      <div className={styles.pageContent}>
        <div className={styles.controls}>
          <button
            className={playClass}
            onClick={this.onPlayButton}
            disabled={activeButton === controlButtons.play}
          >
            <PlayButton />
          </button>
          <button
            className={stopClass}
            onClick={this.onStopButton}
            disabled={activeButton === controlButtons.stop}
          >
            <StopButton />
          </button>
        </div>
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

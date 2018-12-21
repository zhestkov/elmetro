// @flow
import React, { Component } from "react";
import { inject } from "mobx-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { DataTabs } from "./DataTabs";

import "react-tabs/style/react-tabs.less";
import * as styles from "./data-page.less";
import { Controls } from "./Controls";

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

  // renderTabBar = (defaultProps, DefaultTabBar) => {
  //   const { activeButton } = this.state;
  //   const playClass = cn(
  //     "playButton",
  //     activeButton === controlButtons.play && "activeButton"
  //   );
  //   const stopClass = cn(
  //     "stopButton",
  //     activeButton === controlButtons.stop && "activeButton"
  //   );
  //   return (
  //     <div className={styles.tabBarWrapper}>
  //       <div className={styles.controls}>
  //         <button
  //           className={playClass}
  //           onClick={this.onPlayButton}
  //           disabled={activeButton === controlButtons.play}
  //         >
  //           {/*<PlayButton />*/}
  //           <img src={PLAY_BUTTON_PATH} />
  //         </button>
  //         <button
  //           className={stopClass}
  //           onClick={this.onStopButton}
  //           disabled={activeButton === controlButtons.stop}
  //         >
  //           {/*<StopButton />*/}
  //           <img src={STOP_BUTTON_PATH} />
  //         </button>
  //       </div>
  //       <DefaultTabBar {...defaultProps} />
  //     </div>
  //   );
  // };

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
    debugger;
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
    // const tabTypes = Object.keys(DataTabs.tabs);

    return (
      <div className={styles.pageContent}>
        {this.renderTabs()}
        {/*<Tabs*/}
        {/*type="card"*/}
        {/*defaultActiveKey={this.state.activeTabKey}*/}
        {/*onChange={this.onChangeTab}*/}
        {/*renderTabBar={this.renderTabBar}*/}
        {/*>*/}
        {/*{tabTypes.map(this.renderTab)}*/}
        {/*</Tabs>*/}
      </div>
    );
  }
}

// @flow
import React from "react";
import { observer } from "mobx-react";
import { Tabs } from "antd";
import { AllDataTable } from "./AllDataTable";
import { AllDataGraphics } from "./AllDataGraphics/AllDataGraphics";

const TabPane = Tabs.TabPane;

const TABLE_LABEL: string = "Таблица";
const GRAPHICS_LABEL: string = "Графики";

const tabsMap = [
  {
    label: TABLE_LABEL,
    Component: AllDataTable
  },
  {
    label: GRAPHICS_LABEL,
    Component: AllDataGraphics
  }
];

type Props = {
  dataStore?: *,
  regStore?: *
};

@observer
export class AllData extends React.Component<Props> {
  state = {
    activeTabKey: TABLE_LABEL
  };

  onChangeTab = (newTabKey: string): void => {
    this.setState({ activeTabKey: newTabKey });
  };

  renderTab = (tab: *) => {
    const { label, Component } = tab;
    const { dataStore, regStore } = this.props;
    return (
      <TabPane tab={label} key={label}>
        {this.state.activeTabKey === label && (
          <Component dataStore={dataStore} regStore={regStore} />
        )}
      </TabPane>
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

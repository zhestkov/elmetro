// @flow
import React from "react";
import { observer } from "mobx-react";
import { Tabs } from "antd";
import { AllDataTable } from "./AllDataTable";

type Props = {
  model?: *,
  dataStore: *
};

const TabPane = Tabs.TabPane;

const tabsMap = [
  {
    label: "Table",
    Component: AllDataTable
  },
  {
    label: "Graphics",
    Component: AllDataTable // TODO: implement Graphics component
  }
];

@observer
export class AllData extends React.Component<Props> {
  renderTab = (tab: *) => {
    const { label, Component } = tab;
    return (
      <TabPane tab={`${label}`} key={`${label}`}>
        <Component dataStore={this.props.dataStore} />
      </TabPane>
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

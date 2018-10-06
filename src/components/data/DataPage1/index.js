// @flow
import React from "react";
import { observer } from "mobx-react";
import { Tabs } from "antd";
import { Page1Table } from "./Page1Table";

type Props = {
  model?: *
};

const TabPane = Tabs.TabPane;

const tabsMap = [
  {
    label: "Table",
    Component: Page1Table
  },
  {
    label: "Graphics",
    Component: Page1Table // TODO: implement Graphics component
  }
];

@observer
export class DataPage1 extends React.Component<Props> {
  renderTab = (tab: *) => {
    const { label, Component } = tab;
    return (
      <TabPane tab={`${label}`} key={`${label}`}>
        Page1
        <Component />
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

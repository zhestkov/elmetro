// @flow
import React from "react";
import { observer } from "mobx-react";
import { Tabs } from "antd";
import { Page6Table } from "./Page6Table";

type Props = {
  model?: *
};

const TabPane = Tabs.TabPane;

const tabsMap = [
  {
    label: "Table",
    Component: Page6Table
  },
  {
    label: "Graphics",
    Component: Page6Table // TODO: implement Graphics component
  }
];

@observer
export class DataPage6 extends React.Component<Props> {
  renderTab = (tab: *) => {
    const { label, Component } = tab;
    return (
      <TabPane tab={`${label}`} key={`${label}`}>
        Page6
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

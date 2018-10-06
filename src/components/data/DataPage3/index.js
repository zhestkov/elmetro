// @flow
import React from "react";
import { observer } from "mobx-react";
import { Tabs } from "antd";
import { Page3Table } from "./Page3Table";

type Props = {
  model?: *
};

const TabPane = Tabs.TabPane;

const tabsMap = [
  {
    label: "Table",
    Component: Page3Table
  },
  {
    label: "Graphics",
    Component: Page3Table // TODO: implement Graphics component
  }
];

@observer
export class DataPage3 extends React.Component<Props> {
  renderTab = (tab: *) => {
    const { label, Component } = tab;
    return (
      <TabPane tab={`${label}`} key={`${label}`}>
        Page3
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

// @flow
import React from "react";
import { observer } from "mobx-react";
import { Tabs } from "antd";
import { Page5Table } from "./Page5Table";

type Props = {
  model?: *
};

const TabPane = Tabs.TabPane;

const tabsMap = [
  {
    label: "Table",
    Component: Page5Table
  },
  {
    label: "Graphics",
    Component: Page5Table // TODO: implement Graphics component
  }
];

@observer
export class DataPage5 extends React.Component<Props> {
  renderTab = (tab: *) => {
    const { label, Component } = tab;
    return (
      <TabPane tab={`${label}`} key={`${label}`}>
        Page5
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

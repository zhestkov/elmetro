// @flow
import React from "react";
import { observer } from "mobx-react";
import { Tabs } from "antd";
import { Page4Table } from "./Page4Table";

type Props = {
  model?: *
};

const TabPane = Tabs.TabPane;

const tabsMap = [
  {
    label: "Table",
    Component: Page4Table
  },
  {
    label: "Graphics",
    Component: Page4Table // TODO: implement Graphics component
  }
];

@observer
export class DataPage4 extends React.Component<Props> {
  renderTab = (tab: *) => {
    const { label, Component } = tab;
    return (
      <TabPane tab={`${label}`} key={`${label}`}>
        Page4
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

// @flow
import React from "react";
import { observer } from "mobx-react";
import { Tabs } from "antd";
import { Page2Table } from "./Page2Table";

type Props = {
  model?: *
};

const TabPane = Tabs.TabPane;

const tabsMap = [
  {
    label: "Table",
    Component: Page2Table
  },
  {
    label: "Graphics",
    Component: Page2Table // TODO: implement Graphics component
  }
];

@observer
export class DataPage2 extends React.Component<Props> {
  renderTab = (tab: *) => {
    const { label, Component } = tab;
    return (
      <TabPane tab={`${label}`} key={`${label}`}>
        Page2
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

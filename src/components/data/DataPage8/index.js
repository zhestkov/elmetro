// @flow
import React from "react";
import { observer } from "mobx-react";
import { Tabs } from "antd";
import { Page8Table } from "./Page8Table";

type Props = {
  model?: *
};

const TabPane = Tabs.TabPane;

const tabsMap = [
  {
    label: "Table",
    Component: Page8Table
  },
  {
    label: "Graphics",
    Component: Page8Table // TODO: implement Graphics component
  }
];

@observer
export class DataPage8 extends React.Component<Props> {
  renderTab = (tab: *) => {
    const { label, Component } = tab;
    return (
      <TabPane tab={`${label}`} key={`${label}`}>
        Page8
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

// @flow
import React from "react";
import { observer } from "mobx-react";
import { Tabs } from "antd";
import { Page7Table } from "./Page7Table";

type Props = {
  model?: *
};

const TabPane = Tabs.TabPane;

const tabsMap = [
  {
    label: "Table",
    Component: Page7Table
  },
  {
    label: "Graphics",
    Component: Page7Table // TODO: implement Graphics component
  }
];

@observer
export class DataPage7 extends React.Component<Props> {
  renderTab = (tab: *) => {
    const { label, Component } = tab;
    return (
      <TabPane tab={`${label}`} key={`${label}`}>
        Page7
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

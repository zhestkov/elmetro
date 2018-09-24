// @flow
import React from "react";
import { inject, observer } from "mobx-react";
import { Tabs } from "antd";
import { AllDataTable } from "./AllDataTable";

type Props = {
  model: *
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

@inject("enumStore")
@observer
export class Index extends React.Component<Props> {
  renderTab = (tab: *) => {
    const { label, Component } = tab;
    return (
      <TabPane tab={`${label}`} key={`${label}`}>
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

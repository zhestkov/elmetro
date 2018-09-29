// @flow
import React from "react";
import { inject, observer } from "mobx-react";
import { Tabs } from "antd";
import { AllDataTable } from "./AllDataTable";

type Props = {
  model: *,
  data: *
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
        <Component data={this.props.data} />
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

// @flow
import React from "react";
import { observer } from "mobx-react";
import { Tabs } from "antd";
import { AllDataTable } from "./AllDataTable";
import { AllDataGraphics } from "./AllDataGraphics";
import { AllDataTableModel } from "../../../models/tables/AllDataTableModel";

const TabPane = Tabs.TabPane;

const tabsMap = [
  {
    label: "Table",
    Component: AllDataTable
  },
  {
    label: "Graphics",
    Component: AllDataGraphics
  }
];

type Props = {
  dataStore?: *,
  regStore?: *
};

@observer
export class AllData extends React.Component<Props> {
  state = {
    dataTableModel: new AllDataTableModel("all-data")
  };

  renderTab = (tab: *) => {
    const { label, Component } = tab;
    // const { dataStore, regStore } = this.props;
    return (
      <TabPane tab={`${label}`} key={`${label}`}>
        <Component model={this.state.dataTableModel} />
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

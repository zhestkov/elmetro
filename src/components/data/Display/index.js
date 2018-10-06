// @flow
import React from "react";
import { observer } from "mobx-react";
import { Tabs } from "antd";
import { DisplayTableModel } from "../../../models/tables/DisplayTableModel";

type Props = {
  model?: *
};

const TabPane = Tabs.TabPane;

@observer
export class DisplayPage extends React.Component<Props> {
  state = {
    displayTable: new DisplayTableModel("display-table")
  };

  renderTab = (tab: *) => {
    const { label, Component } = tab;
    return (
      <TabPane tab={`${label}`} key={`${label}`}>
        Display
        <Component />
      </TabPane>
    );
  };

  render() {
    return <div>TODO: DISPLAY TABLE</div>;
  }
}

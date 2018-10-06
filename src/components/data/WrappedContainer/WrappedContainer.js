// @flow
import React, { Component } from "react";
import { Tabs } from "antd";

import * as styles from "./styles.css";

type Props = {
  id: string,
  tabsMap: [{ label: string, Component: React.Component }],
  TableModelClass?: *
};

export function wrappedContainer(WrappedComponent?: React.Component) {
  return class WrappedContainer extends Component<Props> {
    renderTab = (tab: *) => {
      const { label, Component } = tab;
      return (
        <Tabs.TabPane tab={`${label}`} key={`${label}`}>
          <Component />
        </Tabs.TabPane>
      );
    };

    render() {
      if (WrappedComponent != null) {
        return <WrappedComponent {...this.props} />;
      }
      return (
        <div>
          <Tabs>{this.props.tabsMap.map(this.renderTab)}</Tabs>
          <WrappedComponent />
        </div>
      );
    }
  };
}

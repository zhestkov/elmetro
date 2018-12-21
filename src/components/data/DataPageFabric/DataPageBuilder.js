// @flow
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { DataPageTableModel } from "../../../models/tables/DataPageTableModel";
import { TableTab } from "./TableTab";
import { GraphicsTab } from "./GraphicsTab/GraphicsTab";

import * as styles from "./data-page.less";

const TABLE_LABEL: string = "Таблица";
const GRAPHICS_LABEL: string = "Графики";

const tabsMap = [
  {
    label: TABLE_LABEL,
    Component: TableTab
  },
  {
    label: GRAPHICS_LABEL,
    Component: GraphicsTab
  }
];

type Props = {
  id: string,
  dataStore: *,
  regStore: *
};

export function makeDataPage(pageNumber: number) {
  @inject("dataStore", "regStore")
  @observer
  class WrappedDataPage extends Component<Props> {
    state = {
      tableModel: new DataPageTableModel(`page-${pageNumber}`, pageNumber),
      activeTabKey: TABLE_LABEL
    };

    onChangeTab = (newTabKey: string): void => {
      this.setState({ activeTabKey: newTabKey });
    };

    renderTabs = () => {
      const { dataStore, regStore } = this.props;
      const labels = [];
      const components = [];
      tabsMap.forEach(tab => {
        labels.push(tab.label);
        components.push(tab.Component);
      });
      return (
        <Tabs>
          <TabList>
            {labels.map((label, index) => <Tab key={index}>{label}</Tab>)}
          </TabList>
          {components.map((Component, index) => (
            <TabPanel key={index}>
              <Component
                model={this.state.tableModel}
                dataStore={dataStore}
                regStore={regStore}
              />
            </TabPanel>
          ))}
        </Tabs>
      );
    };

    render() {
      return <div className={styles.pageWrapper}>{this.renderTabs()}</div>;
    }
  }
  return WrappedDataPage;
}

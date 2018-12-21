// @flow
import React from "react";
import { observer } from "mobx-react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { AllDataTable } from "./AllDataTable";
import { AllDataGraphics } from "./AllDataGraphics/AllDataGraphics";

import * as styles from "./all-data.less";

const TABLE_LABEL: string = "Таблица";
const GRAPHICS_LABEL: string = "Графики";

const tabsMap = [
  {
    label: TABLE_LABEL,
    Component: AllDataTable
  },
  {
    label: GRAPHICS_LABEL,
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
            <Component dataStore={dataStore} regStore={regStore} />
          </TabPanel>
        ))}
      </Tabs>
    );
  };

  render() {
    return <div className={styles.allDataWrapper}>{this.renderTabs()}</div>;
  }
}

// @flow
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { AllDataTableModel } from "../../../../models/tables/AllDataTableModel";
import { SelectedChannelsTable } from "./SelectedChannelsTable";
import { Charts } from "./Charts";

type Props = {
  model: AllDataTableModel,
  dataStore: *,
  regStore: *,
  selectedChannels: *
};

@inject("selectedChannels")
@observer
export class AllDataGraphics extends Component<Props> {
  getChartsData = () => {
    const { selectedChannels } = this.props;
    const { dataStore } = this.props;
    const orderedData = dataStore.getOrderedDataSnapshot();
    const chartChannels = selectedChannels.SelectedChannels.filter(
      ch => !!ch.arrayType
    );

    const chartsData = {
      data: [],
      options: {
        colors: [],
        names: ["Time"],
        descriptions: ["Time"],
        units: ["s"],
        arrayTypes: ["Time"]
      }
    };

    chartChannels.forEach(ch => {
      chartsData.options.colors.push(ch.color);
      chartsData.options.names.push(ch.name);
      chartsData.options.descriptions.push(ch.description);
      chartsData.options.units.push(ch.units);
      chartsData.options.arrayTypes.push(ch.arrayType);
    });

    for (let timeIndex = 0; timeIndex < orderedData.length; timeIndex++) {
      const currTimeValue = new Date(orderedData[timeIndex].Timestamp);
      const pointData = [currTimeValue];

      chartChannels.forEach(ch => {
        const arrayDataName = `${ch.arrayType}Data`;
        const currValue = orderedData[timeIndex][arrayDataName][ch.arrayIndex];
        pointData.push(currValue);
      });
      chartsData.data.push(pointData);
    }

    return chartsData;
  };

  renderCharts = () => {
    const { selectedChannels } = this.props;
    if (!selectedChannels.HaveSelectedChannels) {
      return null;
    }
    const data = this.getChartsData();
    return <Charts chartsData={data} />;
  };

  render() {
    return (
      <div>
        <SelectedChannelsTable
          selectedChannels={this.props.selectedChannels}
          regStore={this.props.regStore}
        />
        {this.renderCharts()}
      </div>
    );
  }
}

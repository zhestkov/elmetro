// @flow
import React from "react";
import { observer } from "mobx-react";
import { DataPageTableModel } from "../../../../models/tables/DataPageTableModel";
import { Chart } from "./Chart";

type ChartData = {
  description: string,
  units: string,
  low?: number,
  high?: number,
  arrayType: string,
  data: Array<Array<number>>
};

type Props = {
  model: DataPageTableModel,
  dataStore: *,
  regStore: *
};

@observer
export class GraphicsTab extends React.Component<Props> {
  getChartsData = (): Array<ChartData> => {
    const {
      dataStore,
      regStore: { regConfig }
    } = this.props;
    const { Pages } = regConfig.DisplayConfig;
    const pageIndex = this.props.model.pageNumber - 1;
    const channels = Pages[pageIndex].Channels.filter(
      ch => typeof ch === "object"
    );

    const chartsData: Array<ChartData> = [];
    const orderedData = dataStore.getOrderedDataSnapshot();

    channels.forEach(ch => {
      const {
        Source: { Type, Index },
        Low,
        High
      } = ch;

      const dataArrName = `${Type}Data`;
      const configArrName = `${Type}Config`;
      const description = regConfig[configArrName][Index].Desc || "";
      const units = regConfig[configArrName][Index].Units || "";

      const chart = {
        description,
        units,
        low: Low,
        high: High,
        arrayType: Type,
        data: []
      };

      for (let timeIndex = 0; timeIndex < orderedData.length; timeIndex++) {
        const timeValue = new Date(orderedData[timeIndex].Timestamp);
        chart.data.push([
          timeValue,
          orderedData[timeIndex][dataArrName][Index]
        ]);
      }
      chartsData.push(chart);
    });

    return chartsData;
  };

  renderCharts = () => {
    const chartsData = this.getChartsData();
    return chartsData.map((channel, index) => (
      <Chart key={`${channel.description}${index}`} channel={channel} />
    ));
  };

  render() {
    return <div>{this.renderCharts()}</div>;
  }
}

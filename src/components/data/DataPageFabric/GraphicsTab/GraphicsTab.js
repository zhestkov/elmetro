// @flow
import React from "react";
import { observer } from "mobx-react";
import { DataPageTableModel } from "../../../../models/tables/DataPageTableModel";
import { Chart } from "./Chart";
import { defaults } from "react-chartjs-2";

type ChartData = {
  description: string,
  data: Array<{ time: string, value: number }>
};

type Props = {
  model: DataPageTableModel,
  dataStore: *,
  regStore: *
};

@observer
export class GraphicsTab extends React.Component<Props> {
  constructor(props) {
    super(props);
    defaults.global.animation = false;
  }

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

    for (let i = 0; i < channels.length; i++) {
      const {
        Source: { Type, Index }
      } = channels[i];
      const dataArrName = `${Type}Data`;
      const configArrName = `${Type}Config`;
      const description = regConfig[configArrName][Index].Desc;

      const chart = {
        description,
        data: []
      };

      for (let timeIndex = 0; timeIndex < orderedData.length; timeIndex++) {
        if (
          Type === "DI" &&
          timeIndex !== 0 &&
          orderedData[timeIndex - 1][dataArrName][Index] !==
            orderedData[timeIndex][dataArrName][Index]
        ) {
          chart.data.push({
            time: orderedData[timeIndex].Timestamp,
            value: orderedData[timeIndex - 1][dataArrName][Index]
          });
        }

        chart.data.push({
          time: orderedData[timeIndex].Timestamp,
          value: orderedData[timeIndex][dataArrName][Index]
        });
      }
      chartsData.push(chart);
    }
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

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

  getInitialChartsData = () => {
    const {
      regStore: { regConfig }
    } = this.props;
    const { Pages } = regConfig.DisplayConfig;
    const pageId = this.props.model.pageNumber - 1;
    const channels = Pages[pageId].Channels.filter(
      ch => typeof ch !== "string"
    );
    const charts = [];
    channels.forEach(() => {
      charts.push({
        labels: [],
        datasets: [
          {
            label: "",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointHoverRadius: 5,
            pointRadius: 5,
            pointHitRadius: 10,
            data: []
          }
        ]
      });
    });
    return charts;
  };

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
    debugger;
    return chartsData.map((channel, index) => (
      <Chart key={`${channel.description}${index}`} channel={channel} />
    ));
  };

  render() {
    return <div>{this.renderCharts()}</div>;
  }
}

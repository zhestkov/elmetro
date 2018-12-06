// @flow
import React from "react";
import { observer, inject } from "mobx-react";
import { DataPageTableModel } from "../../../../models/tables/DataPageTableModel";
import { Chart } from "./Chart";
import { defaults } from "react-chartjs-2";
// import { deepCloneObject } from "../../../../service/utils";

type Props = {
  model: DataPageTableModel,
  dataStore?: *,
  regStore?: *
  // channels?: Array<*>
};

@inject("dataStore", "regStore")
@observer
export class GraphicsTab extends React.Component<Props> {
  constructor(props) {
    super(props);
    defaults.global.animation = false;
    // const charts = this.getInitialChartsData();
    // this.state = { charts };
  }

  // updateChartData = (channel: { value: number, id: number}) => {
  //
  // };

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

  getChartsData = () => {
    const {
      dataStore,
      regStore: { regConfig }
    } = this.props;
    const { Pages } = regConfig.DisplayConfig;
    const charts = [];
    const pageIndex = this.props.model.pageNumber - 1;
    const channels = Pages[pageIndex].Channels.filter(
      ch => ch != null && typeof ch !== "string"
    );
    for (let i = 0; i < channels.length; i++) {
      // let chartData = Object.assign({}, initialChartData);
      const chartData = {
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
      };
      const { Source } = channels[i];
      const dataArrName = `${Source.Type}Data`;
      const configArrName = `${Source.Type}Config`;
      const description = regConfig[configArrName][Source.Index].Desc;

      // loop through DataStore Cycled Buffer –– getting DATA for particular channel
      for (let index = 0; index <= dataStore.MaxReachedBufferIndex; index++) {
        let ind =
          (index + dataStore.$currentBufferIndex) %
          dataStore.$currentBufferIndex;
        if (
          dataStore.MaxReachedBufferIndex + 1 >
          dataStore.$currentBufferIndex
        ) {
          ind =
            (index + dataStore.$currentBufferIndex) %
            (dataStore.MaxReachedBufferIndex + 1);
        }
        const Timestamp = dataStore.data[ind].Timestamp;
        const prevIndex = ind === 0 ? dataStore.MaxReachedBufferIndex : ind - 1;
        const previousValue =
          dataStore.data[prevIndex][dataArrName][Source.Index];
        const value = dataStore.data[ind][dataArrName][Source.Index];
        if (index !== 0 && Source.Type === "DI" && previousValue !== value) {
          chartData.labels.push(Timestamp);
          chartData.datasets[0].data.push(previousValue);
        }

        chartData.labels.push(Timestamp);
        chartData.datasets[0].data.push(value);

        if (chartData.datasets[0].label.length === 0) {
          chartData.datasets[0].label = description;
        }
      }
      charts.push(chartData);
    }
    return charts;
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

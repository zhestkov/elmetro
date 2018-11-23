// @flow
import React from "react";
import { observer, inject } from "mobx-react";
import { DataPageTableModel } from "../../../../models/tables/DataPageTableModel";
import { Chart } from "./Chart";
import { defaults } from "react-chartjs-2";
// import { deepCloneObject } from "../../../../service/utils";

const initialChartData = {
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
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: []
    }
  ]
};

type Props = {
  model: DataPageTableModel,
  dataStore?: *,
  regStore?: *
  // channels?: Array<*>
};

@inject("dataStore", "regStore")
@observer
export class GraphicsTab extends React.Component<Props> {
  state = {
    charts: []
  };

  constructor(props) {
    super(props);
    defaults.global.animation = false;
  }

  getChartsData = () => {
    const {
      dataStore,
      regStore: { regInfo, regConfig }
    } = this.props;
    // const m = moment().format("hh:mm:ss A");
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
      // const chInfoArrayName = `${Source.Type}ChannelInfo`;
      const description = regConfig[configArrName][Source.Index].Desc;
      // const units = regConfig[configArrName][Source.Index].Units;

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
        const value = dataStore.data[ind][dataArrName][Source.Index];
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
    // const { data } = this.props;
    const chartsData = this.getChartsData();
    return chartsData.map((channel, index) => (
      <Chart key={`${channel.description}${index}`} channel={channel} />
    ));
  };

  render() {
    const { model } = this.props;
    return <div>{this.renderCharts()}</div>;
  }
}

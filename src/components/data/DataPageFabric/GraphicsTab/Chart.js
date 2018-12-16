// @flow
import React from "react";
import { Line } from "react-chartjs-2";

import * as styles from "./Chart.less";

type ChartData = {
  description: string,
  units: string,
  data: Array<{ time: string, value: number }>
};

const options = {
  scales: {
    xAxes: [
      {
        type: "time",
        distribution: "linear"
      }
    ]
  }
};

type Props = {
  channel: ChartData
};
export class Chart extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.chart = this.getBoilerplateConfig();
  }

  componentDidUpdate(prevProps, prevState) {
    const { channel } = this.props;
    if (prevProps.channel !== channel) {
      this.chart.labels = channel.data.map(d => d.time);
      this.chart.datasets[0].data = channel.data.map(d => d.value);
      this.chart.datasets[0].label = `${channel.description} ${channel.units &&
        `(${channel.units})`}`;
    }
  }

  getBoilerplateConfig = () => {
    return {
      labels: [],
      datasets: [
        {
          label: "",
          fill: true,
          lineTension: 0,
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
          pointHoverRadius: 3,
          pointRadius: 3,
          pointHitRadius: 10,
          data: []
        }
      ]
    };
  };

  renderChart = () => {
    return <Line data={this.chart} options={options} />;
  };

  render() {
    return (
      <div className={styles.chartWrapper}>
        <h2>{this.props.channel.description}</h2>
        {this.renderChart()}
      </div>
    );
  }
}

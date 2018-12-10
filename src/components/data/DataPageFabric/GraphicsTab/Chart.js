// @flow
import React from "react";
import { Line } from "react-chartjs-2";

type ChartData = {
  description: string,
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
export class Chart extends React.Component<Props> {
  // static getDerivedStateFromProps(props, state) {}

  constructor(props) {
    super(props);
    this.chart = this.getBoilerplateConfig();
  }

  getBoilerplateConfig = () => {
    return {
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
  };

  renderChart = () => {
    const { channel } = this.props;
    this.chart.labels = channel.data.map(d => d.time);
    this.chart.datasets[0].data = channel.data.map(d => d.value);
    return <Line data={this.chart} options={options} />;
  };

  render() {
    return (
      <div>
        <h2>{this.props.channel.description}</h2>
        {this.renderChart()}
        {/*<Line data={this.state.data} />*/}
      </div>
    );
  }
}

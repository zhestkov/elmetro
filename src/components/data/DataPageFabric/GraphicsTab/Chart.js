// @flow
import React from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";

// const data = {
//   labels: ["January", "February", "March", "April", "May", "June", "July"],
//   datasets: [
//     {
//       label: "My First dataset",
//       fill: false,
//       lineTension: 0.1,
//       backgroundColor: "rgba(75,192,192,0.4)",
//       borderColor: "rgba(75,192,192,1)",
//       borderCapStyle: "butt",
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: "miter",
//       pointBorderColor: "rgba(75,192,192,1)",
//       pointBackgroundColor: "#fff",
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: "rgba(75,192,192,1)",
//       pointHoverBorderColor: "rgba(220,220,220,1)",
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       data: [65, 59, 80, 81, 56, 55, 40]
//     }
//   ]
// };
const initialData = {
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
/*
data: Array(5)
    0:
        description: "сигнал МВ11"
        high: 10
        id: 1
        low: -10
        signal: "МВ11"
        units: "кг"
        value: 7.79
 */
type Channel = {
  description: string,
  high: number,
  id: number,
  low: number,
  signal: string,
  units: string,
  value: number
};
type Props = {
  channel: Array<Channel>
};
export class Chart extends React.Component<Props> {
  renderChart = () => <Line data={this.props.channel} />;

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

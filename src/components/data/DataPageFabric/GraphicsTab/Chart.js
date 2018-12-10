// @flow
import React from "react";
import { Line } from "react-chartjs-2";

type ChartData = {
  description: string,
  data: Array<{ time: string, value: number }>
};

type Props = {
  channel: *
};
export class Chart extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
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

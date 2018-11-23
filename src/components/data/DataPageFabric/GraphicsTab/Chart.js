// @flow
import React from "react";
import moment from "moment";
import { Line } from "react-chartjs-2";

type Props = {
  channel: *
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

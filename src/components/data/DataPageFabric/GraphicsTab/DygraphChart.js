// @flow
import React from "react";
import Dygraphs from "dygraphs";

import * as styles from "./Chart.less";

type ChartData = {
  description: string,
  units: string,
  data: Array<Array<number>>
};

type Props = {
  channel: ChartData
};

export class DygraphChart extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.chartConfig = this.getDygraphConfig();
  }

  componentDidMount() {
    const { channel } = this.props;
    this.chart = new Dygraphs(this.chartRef, channel.data, this.chartConfig);
  }

  componentDidUpdate(prevProps, prevState) {
    const { channel } = this.props;
    if (prevProps.channel !== channel) {
      this.chart.updateOptions({ file: channel.data });
    }
  }

  getDygraphConfig = () => {
    const { channel } = this.props;
    return {
      ylabel: `${channel.description}` || "",
      drawPoints: true,
      showRoller: false,
      stackedGraph: false,
      fillGraph: true,
      strokeWidth: 1,
      labels: ["Time", `${channel.description || "value"}`],
      highlightSeriesOpts: {
        strokeWidth: 2,
        highlightCircleSize: 3
      }
    };
  };

  // componentDidUpdate(prevProps, prevState) {
  //   const { channel } = this.props;
  //   if (prevProps.channel !== channel) {
  //     this.chart.labels = channel.data.map(d => d.time);
  //     this.chart.datasets[0].data = channel.data.map(d => d.value);
  //     this.chart.datasets[0].label = `${channel.description} ${channel.units &&
  //       `(${channel.units})`}`;
  //   }
  // }

  renderChart = () => {
    return (
      <div className={styles.chart} ref={node => (this.chartRef = node)} />
    );
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

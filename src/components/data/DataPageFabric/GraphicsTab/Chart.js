// @flow
import React from "react";
import Dygraphs from "dygraphs";

import * as styles from "./Chart.less";

type ChartData = {
  description: string,
  units: string,
  arrayType: string,
  data: Array<Array<number>>
};

type Props = {
  channel: ChartData
};

const DISCRETE_ARRAY_TYPES = ["DI", "DO"];

export class Chart extends React.PureComponent<Props> {
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
      const series = {};
      if (DISCRETE_ARRAY_TYPES.includes(channel.arrayType)) {
        series[channel.description] = { stepPlot: true };
      }
      this.chart.updateOptions({ file: channel.data, series });
    }
  }

  getDygraphConfig = () => {
    const { channel } = this.props;
    const series = {};
    if (DISCRETE_ARRAY_TYPES.includes(channel.arrayType)) {
      series[channel.description] = { stepPlot: true };
    }

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
      },
      series
    };
  };

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

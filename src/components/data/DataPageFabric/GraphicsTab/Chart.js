// @flow
import React from "react";
import Dygraphs from "dygraphs";

import * as styles from "./Chart.less";

type ChartData = {
  description: string,
  units: string,
  low?: number,
  high?: number,
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

  componentWillUnmount() {
    this.chart.destroy();
  }

  componentDidUpdate(prevProps, prevState) {
    const { channel } = this.props;
    if (prevProps.channel !== channel) {
      const series = {};
      const { low, high } = channel;
      const isDiscreteType = DISCRETE_ARRAY_TYPES.includes(channel.arrayType);
      let valueRange = low != null && high != null ? [low, high] : [];

      if (isDiscreteType) {
        series[channel.description] = { stepPlot: true };
        valueRange = [-1, 2];
      }
      this.chart.updateOptions({
        file: channel.data,
        series,
        valueRange
      });
    }
  }

  yAxisTicker = (a, b, pixels, opts, dygraph) => {
    const formatter = opts("axisLabelFormatter");

    const counts = 8;
    const ticks = [];
    for (let i = 0; i < counts; i++) {
      let v = a + (i * (b - a)) / (counts - 1);
      const label = formatter(v, 0, opts, dygraph);
      if (i === counts - 1) {
        v -= 1e-10;
      }

      ticks.push({
        v,
        label
      });
    }
    return ticks;
  };

  getDygraphConfig = () => {
    const { channel } = this.props;
    const { low, high } = channel;
    const isDiscreteType = DISCRETE_ARRAY_TYPES.includes(channel.arrayType);
    const series = {};

    let valueRange = low != null && high != null ? [low, high] : [];
    if (isDiscreteType) {
      series[channel.description] = { stepPlot: true };
      valueRange = [-1, 2];
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
      axes: {
        y: {
          ticker: this.yAxisTicker
        }
      },
      series,
      valueRange
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

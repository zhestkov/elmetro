// @flow
import React from "react";
import Dygraphs from "dygraphs";

import * as styles from "./Chart.less";

type ChartData = {
  data: Array<Array<number>>,
  name: string,
  arrayType: string,
  units?: string,
  description?: string,
  low?: number,
  high?: number
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

  componentDidUpdate(prevProps) {
    const { channel } = this.props;
    const { description, units, low, high, arrayType, data } = channel;
    if (prevProps.channel !== channel) {
      // Might be better to re-implement it using LegendFormatter
      const valueLabel = `${description || name} ${units && `(${units})`}`;

      const series = {};
      const isDiscreteType = DISCRETE_ARRAY_TYPES.includes(arrayType);
      let valueRange = low != null && high != null ? [low, high] : [];

      if (isDiscreteType) {
        series[valueLabel] = { stepPlot: true };
        valueRange = [-1, 2];
      }
      this.chart.updateOptions({
        file: data,
        series,
        valueRange
      });
    }
  }

  yAxisTicker = (a, b, pixels, opts, dygraph) => {
    const formatter = opts("axisLabelFormatter");

    const counts = 7;
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
    const {
      channel: { low, high, units, arrayType, description, name }
    } = this.props;
    const isDiscreteType = DISCRETE_ARRAY_TYPES.includes(arrayType);
    // Might be better to re-implement it using LegendFormatter
    const valueLabel = `${description || name} ${units && `(${units})`}`;

    const series = {};

    let valueRange = low != null && high != null ? [low, high] : [];
    if (isDiscreteType) {
      series[valueLabel] = { stepPlot: true };
      valueRange = [-1, 2];
    }

    return {
      drawPoints: true,
      showRoller: false,
      stackedGraph: false,
      fillGraph: true,
      strokeWidth: 1,
      labels: ["Time", valueLabel],
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

// @flow
import React from "react";
import Dygraphs from "dygraphs";

import * as styles from "./charts.less";

type ChartOptions = {
  colors: Array<string>,
  names: Array<string>,
  units: Array<string>,
  descriptions: Array<string>,
  arrayTypes: Array<string>
};

type Props = {
  chartsData: { data: Array<Array<number>>, options: ChartOptions }
};

const DISCRETE_ARRAY_TYPES = ["DI", "DO"];

export class Charts extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.chartsConfig = this.getDygraphConfig();
  }

  componentDidMount() {
    const { chartsData } = this.props;
    this.charts = new Dygraphs(
      this.chartsContainerRef,
      chartsData.data,
      this.chartsConfig
    );
  }

  componentWillUnmount() {
    this.charts.destroy();
  }

  componentDidUpdate(prevProps) {
    const { chartsData } = this.props;
    if (prevProps.chartsData !== chartsData) {
      const { data, options } = chartsData;
      const series = {};
      const chartLabels = [];

      // making MEANDER-STEPS for discrete signals(DI/DO)
      options.names.forEach((name, seriesIndex) => {
        const units = options.units[seriesIndex];
        const description = options.descriptions[seriesIndex];
        chartLabels.push(`${name || description}${units && ` (${units})`}`);

        if (DISCRETE_ARRAY_TYPES.includes(options.arrayTypes[seriesIndex])) {
          series[chartLabels[seriesIndex]] = { stepPlot: true };
        }
      });

      this.charts.updateOptions({
        file: data,
        colors: options.colors,
        labels: chartLabels,
        series
      });
    }
  }

  getDygraphConfig = () => {
    const {
      chartsData: { options }
    } = this.props;
    const series = {};
    const chartLabels = [];

    // making MEANDER-STEPS for discrete signals(DI/DO)
    options.names.forEach((name, seriesIndex) => {
      const units = options.units[seriesIndex];
      const description = options.descriptions[seriesIndex];
      chartLabels.push(`${name || description}${units && ` (${units})`}`);

      if (DISCRETE_ARRAY_TYPES.includes(options.arrayTypes[seriesIndex])) {
        series[chartLabels[seriesIndex]] = { stepPlot: true };
      }
    });

    return {
      drawPoints: true,
      showRoller: false,
      stackedGraph: false,
      fillGraph: false,
      strokeWidth: 1,
      labels: chartLabels,
      // labelsSeparateLines: true,
      highlightSeriesOpts: {
        strokeWidth: 2,
        highlightCircleSize: 3
      },
      colors: options.colors,
      series
    };
  };

  renderChart = () => {
    return (
      <div
        className={styles.chart}
        ref={node => (this.chartsContainerRef = node)}
      />
    );
  };

  render() {
    return (
      <div className={styles.chartWrapper}>
        <h2>Выбранные каналы</h2>
        {this.renderChart()}
      </div>
    );
  }
}

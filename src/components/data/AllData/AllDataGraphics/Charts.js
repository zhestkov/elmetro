// @flow
import React from "react";
import Dygraphs from "dygraphs";

import * as styles from "./Chart.less";

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

  componentDidUpdate(prevProps, prevState) {
    const { chartsData } = this.props;
    const { data, options } = chartsData;

    if (prevProps.chartsData !== chartsData) {
      const series = {};
      // making MEANDER-STEPS for discrete signals(DI/DO)
      options.arrayTypes.forEach((type, index) => {
        if (DISCRETE_ARRAY_TYPES.includes(type)) {
          series[options.names[index]] = { stepPlot: true };
        }
      });

      this.charts.updateOptions({
        file: data,
        colors: options.colors,
        labels: options.names,
        series
      });
    }
  }

  getDygraphConfig = () => {
    const { chartsData } = this.props;
    const series = {};
    // making MEANDER-STEPS for discrete signals(DI/DO)
    chartsData.options.arrayTypes.forEach((type, index) => {
      if (DISCRETE_ARRAY_TYPES.includes(type)) {
        series[chartsData.options.names[index]] = { stepPlot: true };
      }
    });

    return {
      drawPoints: true,
      showRoller: false,
      stackedGraph: false,
      fillGraph: false,
      strokeWidth: 1,
      labels: chartsData.options.names,
      highlightSeriesOpts: {
        strokeWidth: 2,
        highlightCircleSize: 3
      },
      colors: chartsData.options.colors,
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

// @flow
import React from "react";
import Dygraphs from "dygraphs";

import * as styles from "./Chart.less";

type ChartOptions = {
  colors: string,
  names: string,
  units: string,
  descriptions: string
};

type Props = {
  chartsData: { data: Array<Array<number>>, options: ChartOptions }
};

export class DygraphsChart extends React.PureComponent<Props> {
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
      this.charts.updateOptions({
        file: data,
        colors: options.colors,
        labels: options.names
      });
    }
  }

  getDygraphConfig = () => {
    const { chartsData } = this.props;
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
      colors: chartsData.options.colors
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
      <div
        className={styles.chart}
        ref={node => (this.chartsContainerRef = node)}
      />
    );
  };

  render() {
    return (
      <div className={styles.chartWrapper}>
        <h2>Chosen channels</h2>
        {this.renderChart()}
      </div>
    );
  }
}

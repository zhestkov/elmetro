// @flow
import React from "react";
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryLine,
  VictoryAxis,
  VictoryLabel,
  VictoryTooltip
} from "victory";

import * as styles from "./Chart.less";

type ChartData = {
  data: Array<{ time: string, value: number }>,
  color: string
};

type Props = {
  data: Array<ChartData>
};

export class Chart extends React.Component<Props> {
  constructor() {
    super();
    this.state = {};
  }

  getData = () => {};
  handleZoom(domain) {
    this.setState({ selectedDomain: domain });
  }

  handleBrush(domain) {
    this.setState({ zoomDomain: domain });
  }

  render() {
    const { data } = this.props;
    return (
      <div className={styles.chartWrapper}>
        <VictoryChart
          scale={{ x: "time" }}
          containerComponent={
            <VictoryZoomContainer
              responsive={true}
              zoomDimension="x"
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
              labelComponent={
                <VictoryTooltip flyoutStyle={{ fill: "white" }} />
              }
              labels={d => `value: ${d.value}`}
            />
          }
        >
          {data.map(chart => (
            <VictoryLine
              style={{
                data: { stroke: chart.color },
                width: 2
              }}
              data={chart.data.map(values => ({
                ...values,
                label: "some label"
              }))}
              x="time"
              y="value"
            />
          ))}
          <VictoryAxis
            tickCount={6}
            style={{
              ticks: { stroke: "blue", size: 0 },
              tickLabels: {
                fontSize: 12,
                padding: 50,
                angle: -60
              }
            }}
          />
          <VictoryAxis
            dependentAxis
            tickCount={10}
            style={{
              tickLabels: {
                fontSize: 14
              }
            }}
          />
        </VictoryChart>

        {/*<VictoryChart*/}
        {/*padding={{ top: 50, left: 50, right: 50, bottom: 30 }}*/}
        {/*width={600}*/}
        {/*height={90}*/}
        {/*scale={{ x: "time" }}*/}
        {/*containerComponent={*/}
        {/*<VictoryBrushContainer*/}
        {/*responsive={false}*/}
        {/*brushDimension="x"*/}
        {/*brushDomain={this.state.selectedDomain}*/}
        {/*onBrushDomainChange={this.handleBrush.bind(this)}*/}
        {/*/>*/}
        {/*}*/}
        {/*>*/}
        {/*<VictoryAxis*/}
        {/*tickValues={[*/}
        {/*new Date(1985, 1, 1),*/}
        {/*new Date(1990, 1, 1),*/}
        {/*new Date(1995, 1, 1),*/}
        {/*new Date(2000, 1, 1),*/}
        {/*new Date(2005, 1, 1),*/}
        {/*new Date(2010, 1, 1)*/}
        {/*]}*/}
        {/*tickFormat={x => new Date(x).getFullYear()}*/}
        {/*/>*/}
        {/*<VictoryLine*/}
        {/*style={{*/}
        {/*data: { stroke: "tomato" }*/}
        {/*}}*/}
        {/*data={[*/}
        {/*{ x: new Date(1982, 1, 1), y: 125 },*/}
        {/*{ x: new Date(1987, 1, 1), y: 257 },*/}
        {/*{ x: new Date(1993, 1, 1), y: 345 },*/}
        {/*{ x: new Date(1997, 1, 1), y: 515 },*/}
        {/*{ x: new Date(2001, 1, 1), y: 132 },*/}
        {/*{ x: new Date(2005, 1, 1), y: 305 },*/}
        {/*{ x: new Date(2011, 1, 1), y: 270 },*/}
        {/*{ x: new Date(2015, 1, 1), y: 470 }*/}
        {/*]}*/}
        {/*/>*/}
        {/*</VictoryChart>*/}
      </div>
    );
  }
}

// @flow
import React, { Component } from "react";
import { observer } from "mobx-react";
import { convertUnicode } from "../../../../service/utils";

import { AllDataGraphicsTableModel } from "../../../../models/tables/AllDataGraphicsTableModel";
import { AllDataTableModel } from "../../../../models/tables/AllDataTableModel";

import { BaseTable } from "../../../common/Table/BaseTable";
import { SelectAntd } from "../../../common/SelectAntd/index";
import { ColorPicker } from "./ColorPicker";
import { DygraphsChart } from "./DygraphsChart";

import * as styles from "./AllDataGraphics.less";

const SOURCE_TYPES: Array<string> = ["AI", "AO", "DI", "DO", "TTL"];
const NUMBER_OF_CHANNELS: number = 8;
const DISABLED_CHANNEL_NAME: string = "Disabled";

// FINAL LIST WILL BE DETERMINED LATER
const COLORS = [
  "green",
  "red",
  "blue",
  "black",
  "yellow",
  "brown",
  "grey",
  "purple",
  "darkturquoise"
];

type ChannelType = {
  color: string,
  name: string,
  description: string,
  units: string
};

type Props = {
  model: AllDataTableModel,
  dataStore: *,
  regStore: *
};

@observer
export class AllDataGraphics extends Component<Props> {
  constructor(props) {
    super(props);
    this.channelsData = this.getFullChannelsData();

    const initialChannels = this.getInitialChannels();
    this.state = {
      graphicsTableModel: new AllDataGraphicsTableModel("all-graphics"),
      chosenChannels: initialChannels,
      isAnyChosen: false // flag: if any channel was chosen
    };
  }

  columns = {
    color: () => ({
      Cell: ({ original }) => {
        return (
          <ColorPicker
            colors={COLORS}
            onChange={newColor => this.onChangeChColor(newColor, original.id)}
          />
        );
      }
    }),
    name: () => ({
      Cell: ({ original }) => {
        return (
          <SelectAntd
            options={this.channelsData}
            onChange={chName => this.onChangeChannel(chName, original.id)}
          />
        );
      }
    })
  };

  getInitialChannels = () => {
    const defaultChannel: ChannelType = {
      color: "green",
      name: "Disabled",
      description: "",
      units: ""
    };
    const channels = [];
    for (let i = 0; i < NUMBER_OF_CHANNELS; i++) {
      channels.push({ ...defaultChannel, id: i });
    }
    return channels;
  };

  setChannelById = (id: number, channel: ChannelType) => {
    this.setState(prevState => {
      const newChannels = prevState.chosenChannels.slice();
      newChannels[id] = channel;
      const numNotDisabledChannels = newChannels.filter(
        ch => ch.name !== DISABLED_CHANNEL_NAME
      ).length;
      return {
        chosenChannels: newChannels,
        isAnyChosen: numNotDisabledChannels > 0
      };
    });
  };

  onChangeChannel = (chName: *, id: *): void => {
    console.log(chName);
    const newChannel = this.channelsData.find(
      ch => ch.name === chName || ch.description === chName
    );
    const { color } = this.state.chosenChannels[id];
    if (newChannel) {
      this.setChannelById(id, {
        ...newChannel,
        id,
        color
      });
    }
  };

  onChangeChColor = (newColor: string, chId: number) => {
    const newChannels = this.state.chosenChannels.slice();
    newChannels[chId].color = newColor;
    this.setState({ chosenChannels: newChannels });
  };

  getFullChannelsData = () => {
    const data = [];
    const disabledChannel = {
      name: DISABLED_CHANNEL_NAME,
      units: "",
      description: ""
    };
    data.push(disabledChannel);
    const {
      regStore: { regInfo, regConfig }
    } = this.props;
    const { DeviceInfo } = regInfo;
    SOURCE_TYPES.forEach(type => {
      const configArrName = `${type}Config`;
      const chInfoArrName = `${type}ChannelInfo`;

      regConfig[configArrName].forEach((chConfig, chIndex) => {
        const name =
          DeviceInfo &&
          DeviceInfo[chInfoArrName] &&
          DeviceInfo[chInfoArrName].length
            ? convertUnicode(DeviceInfo[chInfoArrName][chIndex].Name)
            : "";
        const units = chConfig.Units || "";
        const description = chConfig.Desc || "";
        data.push({
          name,
          units,
          description,
          arrayType: type,
          arrayIndex: chIndex
        });
      });
    });
    return data;
  };

  getChartsData = () => {
    const { chosenChannels } = this.state;
    const { dataStore } = this.props;
    const orderedData = dataStore.getOrderedDataSnapshot();
    const chartChannels = chosenChannels.filter(ch => !!ch.arrayType);

    const chartsData = {
      data: [],
      options: {
        colors: [],
        names: ["Time"],
        descriptions: ["Time"],
        units: ["s"]
      }
    };

    chartChannels.forEach(ch => {
      chartsData.options.colors.push(ch.color);
      chartsData.options.names.push(ch.name);
      chartsData.options.descriptions.push(ch.description);
      chartsData.options.units.push(ch.units);
    });

    for (let timeIndex = 0; timeIndex < orderedData.length; timeIndex++) {
      const currTimeValue = new Date(orderedData[timeIndex].Timestamp);
      const pointData = [currTimeValue];

      chartChannels.forEach(ch => {
        const arrayDataName = `${ch.arrayType}Data`;
        const currValue = orderedData[timeIndex][arrayDataName][ch.arrayIndex];
        pointData.push(currValue);
      });
      chartsData.data.push(pointData);
    }

    // chartChannels.forEach((ch, chIndex) => {
    //   // const chart = {
    //   //   data: [],
    //   //   color: ch.color,
    //   //   name: ch.name,
    //   //   units: ch.units,
    //   //   description: ch.description
    //   // };
    //   const arrayDataName = `${ch.arrayType}Data`;
    //
    //   for (let timeIndex = 0; timeIndex < orderedData.length; timeIndex++) {
    //     const currTimeValue = new Date(orderedData[timeIndex].Timestamp);
    //     const currValue = orderedData[timeIndex][arrayDataName][ch.arrayIndex];
    //     if (
    //       ch.arrayType === "DI" &&
    //       timeIndex !== 0 &&
    //       orderedData[timeIndex - 1][arrayDataName][ch.arrayIndex] !== currValue
    //     ) {
    //       chart.data.push([
    //         currTimeValue,
    //         orderedData[timeIndex - 1][arrayDataName][ch.arrayIndex]
    //       ]);
    //     }
    //     const currPoint = [
    //       currTimeValue,
    //       orderedData[timeIndex][arrayDataName][ch.arrayIndex]
    //     ];
    //     // const point = {
    //     //   time: orderedData[timeIndex].Timestamp,
    //     //   value: orderedData[timeIndex][arrayDataName][ch.arrayIndex]
    //     // };
    //     chart.data.push(currPoint);
    //   }
    //   chartsData.push(chart);
    // });
    return chartsData;
  };

  renderChooseColorTable = () => {
    const { graphicsTableModel } = this.state;
    graphicsTableModel.setData(this.state.chosenChannels);
    return (
      <div className={styles.tableWrapper}>
        <BaseTable
          model={graphicsTableModel}
          customColumns={this.columns}
          showPagination={false}
        />
      </div>
    );
  };

  renderChart = () => {
    const data = this.getChartsData();
    return <DygraphsChart chartsData={data} />;
  };

  render() {
    return (
      <div>
        {this.renderChooseColorTable()}
        {this.state.isAnyChosen && this.renderChart()}
      </div>
    );
  }
}

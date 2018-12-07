// @flow
import React, { Component } from "react";
import { observer } from "mobx-react";
import { convertUnicode } from "../../../service/utils";

import { AllDataGraphicsTableModel } from "../../../models/tables/AllDataGraphicsTableModel";
import { AllDataTableModel } from "../../../models/tables/AllDataTableModel";

import { BaseTable } from "../../common/Table/BaseTable";
import { SelectAntd } from "../../common/SelectAntd";
import { ColorPicker } from "./ColorPicker";
import { Chart } from "./Chart";

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
    debugger;
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
    const chartsData = [];
    chartChannels.forEach(ch => {
      const chart = {
        data: [],
        color: ch.color
      };
      const arrayDataName = `${ch.arrayType}Data`;
      for (let i = 0; i < orderedData.length; i++) {
        const point = {
          time: orderedData[i].Timestamp,
          value: orderedData[i][arrayDataName][ch.arrayIndex]
        };
        chart.data.push(point);
      }
      chartsData.push(chart);
    });
    return chartsData;
  };

  renderChooseColorTable = () => {
    const { graphicsTableModel } = this.state;
    graphicsTableModel.setData(this.state.chosenChannels);
    return (
      <BaseTable
        model={graphicsTableModel}
        customColumns={this.columns}
        showPagination={false}
      />
    );
  };

  renderChart = () => {
    const data = this.getChartsData();
    debugger;
    return <Chart data={data} />;
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

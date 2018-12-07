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

const SOURCE_TYPES = ["AI", "AO", "DI", "DO", "TTL"];
const NUMBER_OF_CHANNELS = 8;

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
    this.channelsData = this.getChannelsData();

    const initialChannels = this.getInitialChannels();
    this.state = {
      graphicsTableModel: new AllDataGraphicsTableModel("all-graphics"),
      chosenChannels: initialChannels
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
      return { chosenChannels: newChannels };
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

  getChannelsData = () => {
    const data = [];
    const disabledChannel = {
      name: "Disabled",
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
          description
        });
      });
    });
    return data;
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
    const { chosenChannels } = this.state;
    const { dataStore } = this.props;
    return <Chart data={dataStore.data} channels={chosenChannels} />;
  };

  render() {
    return (
      <div>
        {this.renderChooseColorTable()}
        {this.renderChart()}
      </div>
    );
  }
}

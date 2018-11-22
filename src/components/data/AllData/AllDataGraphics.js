// @flow
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { convertUnicode } from "../../../service/utils";

import { AllDataGraphicsTableModel } from "../../../models/tables/AllDataGraphicsTableModel";
import { AllDataTableModel } from "../../../models/tables/AllDataTableModel";

import { BaseTable } from "../../common/Table/BaseTable";
import { SelectAntd } from "../../common/SelectAntd";

// TODO: use Number of channels to configure AllDataGraphics tables
const NUMBER_OF_CHANNELS = 8;

const colorArray = ["red", "green", "blue", "black", "yellow", "brown", "grey"];

const defaultChannelRow = {
  // color: "green",
  // name: <SelectAntd onChange={() => {}} onSelect={() => {}} options={[]}/>,
  // description:
};

type Props = {
  model: AllDataTableModel
};

@inject("dataStore", "regStore")
@observer
export class AllDataGraphics extends Component<Props> {
  state = {
    graphicsTableModel: new AllDataGraphicsTableModel("all-graphics")
  };

  constructor(props) {
    super(props);
    this.channelsData = this.getChannelsData();
    this.setDefaultChannels();
  }

  setDefaultChannels = () => {
    const channels = [];
    const ch = {
      color: "green",
      name: "Disabled",
      description: "",
      units: ""
    };
    for (let i = 0; i < NUMBER_OF_CHANNELS; i++) {
      channels.push(ch);
    }
    this.state.graphicsTableModel.setChannels(channels);
  };

  columns = {
    color: () => ({
      Cell: ({ original }) => {
        return <div>{`${original.color} customized`}</div>;
      }
    }),
    name: () => ({
      Cell: ({ original }) => {
        return (
          <SelectAntd
            onChange={() => {}}
            onSelect={() => {}}
            options={this.channelsData.map(ch => ({ ...ch, value: ch.name }))}
          />
        );
      }
    })
  };

  getChannelsData = () => {
    const data = [];
    const defaultChannel = {
      name: "Disabled",
      units: "",
      description: ""
    };
    data.push(defaultChannel);
    const sourceTypes = ["AI", "AO", "DI", "DO", "TTL"];
    const {
      regStore: { regInfo, regConfig }
    } = this.props;
    const { DeviceInfo } = regInfo;
    sourceTypes.forEach(type => {
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
    const data = graphicsTableModel.Channels;
    graphicsTableModel.setData(data);
    return (
      <BaseTable
        model={graphicsTableModel}
        customColumns={this.columns}
        showPagination={false}
      />
    );
  };

  render() {
    return <div>{this.renderChooseColorTable()}</div>;
  }
}

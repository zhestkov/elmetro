// @flow
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { convertUnicode } from "../../../service/utils";

import { AllDataGraphicsTableModel } from "../../../models/tables/AllDataGraphicsTableModel";
import { AllDataTableModel } from "../../../models/tables/AllDataTableModel";

import { BaseTable } from "../../common/Table/BaseTable";
import { SelectAntd } from "../../common/SelectAntd";

const colorArray = ["red", "green", "blue", "black", "yellow", "brown", "grey"];

type Props = {
  model: AllDataTableModel,
  dataStore: *,
  regStore: *
};

@observer
export class AllDataGraphics extends Component<Props> {
  state = {
    graphicsTableModel: new AllDataGraphicsTableModel("all-graphics")
  };

  constructor(props) {
    super(props);
    this.channelsData = this.getChannelsData();
  }

  columns = {
    color: () => ({
      Cell: ({ original }) => {
        return original.color;
      }
    }),
    name: () => ({
      Cell: ({ original }) => {
        return (
          <SelectAntd
            options={this.channelsData}
            onChange={chName => this.onChangeChannel(chName, original)}
          />
        );
      }
    })
  };

  onChangeChannel = (chName: *, original: *): void => {
    console.log(chName);
    const newChannel = this.channelsData.find(
      ch => ch.name === chName || ch.description === chName
    );
    debugger;
    if (newChannel) {
      this.state.graphicsTableModel.setChannelById(original.id, {
        ...newChannel,
        id: original.id
      });
    }
  };

  getChannelsData = () => {
    const data = [];
    const disabledChannel = {
      name: "Disabled",
      units: "",
      description: ""
    };
    data.push(disabledChannel);
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
    // const data = graphicsTableModel.Channels;
    // graphicsTableModel.setData(data);
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

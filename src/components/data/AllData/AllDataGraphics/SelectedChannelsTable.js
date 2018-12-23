// @flow
import React from "react";
import { observer } from "mobx-react";
import { convertUnicode } from "../../../../service/utils";
import { AllDataGraphicsTableModel } from "../../../../models/tables/AllDataGraphicsTableModel";
import { BaseTable } from "../../../common/Table/BaseTable";
import { SelectAntd } from "../../../common/SelectAntd";
import { ColorPicker } from "./ColorPicker";

import * as styles from "./all-data-graphics.less";

type ChannelType = {
  color: string,
  name: string,
  description: string,
  units: string
};

type Props = {
  selectedChannels: *,
  regStore: *
};

const SOURCE_TYPES: Array<string> = ["AI", "AO", "DI", "DO", "TTL"];
const DISABLED_CHANNEL_NAME: string = "Нет";

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

@observer
export class SelectedChannelsTable extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.channelsData = this.getFullChannelsData();
    this.state = {
      graphicsTableModel: new AllDataGraphicsTableModel("all-graphics")
    };
  }

  columns = {
    color: () => ({
      Cell: ({ original }) => {
        const color = this.props.selectedChannels.SelectedChannels[original.id]
          .color;
        return (
          <ColorPicker
            defaultColor={color}
            colors={COLORS}
            onChange={newColor => this.onChangeChColor(original.id, newColor)}
          />
        );
      }
    }),
    name: () => ({
      Cell: ({ original }) => {
        const defaultValue =
          this.props.selectedChannels.SelectedChannels[original.id].name ||
          this.props.selectedChannels.SelectedChannels[original.id].description;
        return (
          <SelectAntd
            defaultValue={defaultValue}
            options={this.channelsData}
            onChange={chName => this.onChangeChannel(original.id, chName)}
            showSearch
          />
        );
      }
    })
  };

  setChannelById = (id: number, channel: ChannelType) => {
    this.props.selectedChannels.setChannelById(id, channel);
  };

  onChangeChannel = (id: number, chName: string): void => {
    const newChannel = this.channelsData.find(
      ch => ch.name === chName || ch.description === chName
    );
    if (newChannel) {
      const color = this.props.selectedChannels.getChannelAttributeById(
        id,
        "color"
      );

      this.setChannelById(id, {
        ...newChannel,
        id,
        color
      });
    }
    this.forceUpdate();
  };

  onChangeChColor = (chId: number, newColor: string) => {
    this.props.selectedChannels.setAttributeChannelById(
      chId,
      "color",
      newColor
    );
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

  renderTable() {
    const { graphicsTableModel } = this.state;
    const { selectedChannels } = this.props;
    graphicsTableModel.setData(selectedChannels.SelectedChannels);
    return (
      <BaseTable
        model={graphicsTableModel}
        customColumns={this.columns}
        showPagination={false}
      />
    );
  }

  render() {
    return <div className={styles.tableWrapper}>{this.renderTable()}</div>;
  }
}

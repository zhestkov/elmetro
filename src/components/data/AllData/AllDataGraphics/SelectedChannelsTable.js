// @flow
import React from "react";
import { AllDataGraphicsTableModel } from "../../../../models/tables/AllDataGraphicsTableModel";
import { BaseTable } from "../../../common/Table/BaseTable";
import { SelectAntd } from "../../../common/SelectAntd";
import { ColorPicker } from "./ColorPicker";

import * as styles from "./AllDataGraphics.less";
import { convertUnicode } from "../../../../service/utils";

type Props = {
  selectedChannels: *,
  regStore: *,
  onChannelChange: () => void,
  onColorChange: () => void
};

const SOURCE_TYPES: Array<string> = ["AI", "AO", "DI", "DO", "TTL"];
const DISABLED_CHANNEL_NAME: string = "Нет";

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
        console.log(original);
        return (
          <ColorPicker
            defaultColor={color}
            colors={COLORS}
            onChange={newColor => this.handleColorChange(original.id, newColor)}
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
            onChange={chName => this.handleChannelChange(original.id, chName)}
            showSearch
          />
        );
      }
    })
  };

  handleChannelChange = (id, chName) => {
    this.props.onChannelChange(id, chName);
  };

  handleColorChange = (id, newColor) => {
    this.props.onColorChange(id, newColor);
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

  render() {
    const { graphicsTableModel } = this.state;
    const { selectedChannels } = this.props;
    graphicsTableModel.setData(selectedChannels.SelectedChannels);
    return (
      <div className={styles.tableWrapper}>
        <BaseTable
          model={graphicsTableModel}
          customColumns={this.columns}
          showPagination={false}
        />
      </div>
    );
  }
}

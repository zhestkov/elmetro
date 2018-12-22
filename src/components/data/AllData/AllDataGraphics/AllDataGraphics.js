// @flow
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { convertUnicode } from "../../../../service/utils";

// import { AllDataGraphicsTableModel } from "../../../../models/tables/AllDataGraphicsTableModel";
import { AllDataTableModel } from "../../../../models/tables/AllDataTableModel";

// import { SelectAntd } from "../../../common/SelectAntd/index";
import { SelectedChannelsTable } from "./SelectedChannelsTable";
// import { ColorPicker } from "./ColorPicker";
import { Charts } from "./Charts";

const SOURCE_TYPES: Array<string> = ["AI", "AO", "DI", "DO", "TTL"];
const NUMBER_OF_CHANNELS: number = 8;
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

type ChannelType = {
  color: string,
  name: string,
  description: string,
  units: string
};

type Props = {
  model: AllDataTableModel,
  dataStore: *,
  regStore: *,
  selectedChannels: *
};

@inject("selectedChannels")
@observer
export class AllDataGraphics extends Component<Props> {
  constructor(props) {
    super(props);
    this.channelsData = this.getFullChannelsData();
    // this.state = {
    //   graphicsTableModel: new AllDataGraphicsTableModel("all-graphics")
    // };
  }

  // columns = {
  //   color: () => ({
  //     Cell: ({ original }) => {
  //       const color = this.props.selectedChannels.SelectedChannels[original.id]
  //         .color;
  //       console.log(original);
  //       return (
  //         <ColorPicker
  //           defaultColor={color}
  //           colors={COLORS}
  //           onChange={newColor => this.onChangeChColor(original.id, newColor)}
  //         />
  //       );
  //     }
  //   }),
  //   name: () => ({
  //     Cell: ({ original }) => {
  //       const defaultValue =
  //         this.props.selectedChannels.SelectedChannels[original.id].name ||
  //         this.props.selectedChannels.SelectedChannels[original.id].description;
  //       return (
  //         <SelectAntd
  //           defaultValue={defaultValue}
  //           options={this.channelsData}
  //           onChange={chName => this.onChangeChannel(original.id, chName)}
  //           showSearch
  //         />
  //       );
  //     }
  //   })
  // };

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

  getChartsData = () => {
    const { selectedChannels } = this.props;
    const { dataStore } = this.props;
    const orderedData = dataStore.getOrderedDataSnapshot();
    const chartChannels = selectedChannels.SelectedChannels.filter(
      ch => !!ch.arrayType
    );

    const chartsData = {
      data: [],
      options: {
        colors: [],
        names: ["Time"],
        descriptions: ["Time"],
        units: ["s"],
        arrayTypes: ["Time"]
      }
    };

    chartChannels.forEach(ch => {
      chartsData.options.colors.push(ch.color);
      chartsData.options.names.push(ch.name);
      chartsData.options.descriptions.push(ch.description);
      chartsData.options.units.push(ch.units);
      chartsData.options.arrayTypes.push(ch.arrayType);
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

    return chartsData;
  };

  // renderChooseColorTable = () => {
  //   const { graphicsTableModel } = this.state;
  //   const { selectedChannels } = this.props;
  //   graphicsTableModel.setData(selectedChannels.SelectedChannels);
  //   return (
  //     <div className={styles.tableWrapper}>
  //       <BaseTable
  //         model={graphicsTableModel}
  //         customColumns={this.columns}
  //         showPagination={false}
  //       />
  //     </div>
  //   );
  // };

  renderCharts = () => {
    const { selectedChannels } = this.props;
    if (!selectedChannels.HaveSelectedChannels) {
      return null;
    }
    const data = this.getChartsData();
    return <Charts chartsData={data} />;
  };

  render() {
    return (
      <div>
        <SelectedChannelsTable
          selectedChannels={this.props.selectedChannels}
          regStore={this.props.regStore}
          onChannelChange={this.onChangeChannel}
          onColorChange={this.onChangeChColor}
        />
        {this.renderCharts()}
      </div>
    );
  }
}

// @flow
import { action, observable, computed } from "mobx";
import { BaseTableModel } from "../BaseTableModel";

// TODO: use Number of channels to configure AllDataGraphics tables
const NUMBER_OF_CHANNELS = 8;

type ChannelType = {
  color: string,
  name: string,
  description: string,
  units: string
};

export class AllDataGraphicsTableModel extends BaseTableModel {
  columns = [
    {
      id: "color",
      field: "color",
      Header: "Color",
      width: 150
    },
    {
      id: "name",
      field: "name",
      Header: "Channel",
      width: 180
    },
    {
      id: "description",
      field: "description",
      Header: "Description",
      accessor: "description",
      width: 150
    },
    {
      id: "units",
      field: "units",
      Header: "Units",
      accessor: "units",
      width: 120
    }
  ];

  total = NUMBER_OF_CHANNELS;
  @observable pageSize = 1;

  @action
  setChannels = (channels: Array<ChannelType>) => {
    this.setData(channels);
  };

  @action
  setChannelById = (id: number, channel: ChannelType) => {
    this.data[id] = channel;
  };

  @computed
  get Channels() {
    return this.data;
  }
}

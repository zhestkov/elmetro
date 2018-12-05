// @flow
import { action, observable, computed, runInAction } from "mobx";
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
      Header: "Color"
    },
    {
      id: "name",
      field: "name",
      Header: "Channel"
    },
    {
      id: "description",
      field: "description",
      Header: "Description",
      accessor: "description"
    },
    {
      id: "units",
      field: "units",
      Header: "Units",
      accessor: "units"
    }
  ];

  total = NUMBER_OF_CHANNELS;
  @observable pageSize = 1;

  constructor(id) {
    super(id);
    const initialChannels = this.getInitialChannels();
    this.setChannels(initialChannels);
  }

  getInitialChannels = () => {
    const defaultChannel: ChannelType = {
      color: "green",
      name: "Disabled",
      description: "default description",
      units: "default units"
    };
    const channels = [];
    for (let i = 0; i < NUMBER_OF_CHANNELS; i++) {
      channels.push({ ...defaultChannel, id: i });
    }
    return channels;
  };

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

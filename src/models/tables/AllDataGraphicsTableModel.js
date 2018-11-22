// @flow
import { action, observable, computed } from "mobx";
import { BaseTableModel } from "../BaseTableModel";

type ChannelType = {
  color: string,
  name: string,
  description: string,
  units: string
};

export class AllDataGraphicsTableModel extends BaseTableModel {
  @observable total = 8;
  @observable pageSize = 1;

  @observable channels: Array<ChannelType> = [];

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

  @action
  setChannels = (channels: Array<ChannelType>) => (this.channels = channels);

  @action
  setChannelById = (id: number, channel: ChannelType) =>
    (this.channels[id] = channel);

  @computed
  get Channels() {
    return this.channels;
  }
}

// @flow
import { action, observable } from "mobx";
import { BaseTableModel } from "../BaseTableModel";

type ChannelType = {
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
      Header: "Color"
    },
    {
      id: "channel",
      Header: "Channel"
    },
    {
      Header: "Description",
      accessor: "description"
    },
    {
      Header: "Units",
      accessor: "units"
    }
  ];
}

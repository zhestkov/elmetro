// @flow
import { observable, action, computed } from "mobx";
import { regStore } from "./RegStore";
import { convertUnicode } from "../service/utils";

type ChannelType = {
  id: number,
  name: string,
  units?: string,
  description?: string,
  color: string,
  arrayIndex: number,
  arrayType: string
};

const SOURCE_TYPES: Array<string> = ["AI", "AO", "DI", "DO", "TTL"];
const NUMBER_OF_CHANNELS: number = 8;
const DISABLED_CHANNEL_NAME: string = "Нет";

export class AllDataChannelsStore {
  @observable channels: Array<ChannelType>;

  constructor() {
    this.channels = this.getInitialChannels();
  }

  getInitialChannels = () => {
    const defaultChannel: ChannelType = {
      color: "green",
      name: DISABLED_CHANNEL_NAME,
      description: "",
      units: ""
    };
    const channels = [];
    for (let i = 0; i < NUMBER_OF_CHANNELS; i++) {
      channels.push({ ...defaultChannel, id: i });
    }
    return channels;
  };

  @computed
  get SelectedChannels() {
    return this.channels;
  }

  @computed
  get HaveSelectedChannels() {
    return (
      this.channels.findIndex(ch => ch.name !== DISABLED_CHANNEL_NAME) > -1
    );
  }

  @action
  setChannelById = (id: number, channel: ChannelType) => {
    this.channels[id] = channel;
  };

  @action
  setAttributeChannelById = (
    id: number,
    attribute: string,
    value: string | value
  ) => {
    this.channels[id][attribute] = value;
  };

  getChannelAttributeById = (id: number, attribute: string) => {
    return this.channels[id][attribute];
  };
}

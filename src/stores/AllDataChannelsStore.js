// @flow
import { observable, action, computed, runInAction } from "mobx";

type ChannelType = {
  id: number,
  name: string,
  units?: string,
  description?: string,
  color: string,
  arrayIndex: number,
  arrayType: string
};

const NUMBER_OF_CHANNELS: number = 8;
const DISABLED_CHANNEL_NAME: string = "Нет";

export class AllDataChannelsStore {
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

  @observable channels: Array<ChannelType> = this.getInitialChannels();

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

// @flow
import { action, observable, computed, runInAction } from "mobx";
import { call } from "../service/api";

type DataEntry = {
  AIData: Array<number>,
  AOData: Array<number>,
  DIData: Array<number>,
  DOData: Array<number>,
  TTLData: Array<number>,
  ConfigChangeCtr: number,
  Status: number,
  Timestamp: string
};

export class DataStore {
  @observable data: Array<DataEntry> = [];

  @observable $currentBufferIndex = 0;
  @observable $maxReachedBufferIndex = 0;

  @observable $NUM_STORED_VALUES: number = 168;

  $dataTimeout = null;

  @computed
  get BufIndex() {
    return this.$currentBufferIndex === 0 ? 0 : this.$currentBufferIndex - 1;
  }

  @computed
  get MaxReachedBufferIndex() {
    return this.$maxReachedBufferIndex;
  }

  @computed
  get NumStoredItems() {
    return this.$NUM_STORED_VALUES;
  }

  clearDataTimeout = () => {
    clearTimeout(this.$dataTimeout);
    // clearInterval(this.$dataTimeout);
  };

  @action setNumStoredItems = (num: number) => (this.$NUM_STORED_VALUES = num);

  @action
  watchData = () => {
    clearTimeout(this.$dataTimeout);
    // clearInterval(this.$dataTimeout);
    this.$dataTimeout = setTimeout(() => this.fetch(), 1000);
    // this.$dataTimeout = setInterval(() => this.fetch(), 1000);
  };

  @action
  fetch = async () => {
    const data = await DataStore.fetch(`/RegData`);
    this.fill(data);
    this.watchData();
  };

  @action
  fill = data => {
    if (data == null) {
      return;
    }
    runInAction("Fill data", () => {
      this.data[this.$currentBufferIndex] = Object.assign({}, data);
      // save/update maximum reached buffer index
      if (this.$maxReachedBufferIndex < this.$currentBufferIndex) {
        this.$maxReachedBufferIndex = this.$currentBufferIndex;
      }
      this.$currentBufferIndex =
        this.$currentBufferIndex + 1 >= this.NumStoredItems
          ? 0
          : this.$currentBufferIndex + 1;
    });
  };

  getAttributes = () =>
    Object.getOwnPropertyNames(this).filter(
      property =>
        property[0] !== "$" &&
        property[0] !== "_" &&
        typeof this[property] !== "function"
    );

  static async fetch(endpoint, options = {}) {
    return call(endpoint, options);
  }
}

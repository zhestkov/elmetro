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

const NUM_STORED_VALUES: number = 3600 * 7;

export class DataStore {
  data: Array<DataEntry> = [];

  constructor(numOfElements: number) {
    this.dataArrLength = numOfElements || NUM_STORED_VALUES;
    // this.data = new Array(this.dataArrLength);
    this.data = [];
  }

  @observable $currentBufferIndex = -1;
  // @observable $maxReachedBufferIndex = 0;

  $dataTimeout = null;

  @computed
  get CurrentBufIndex() {
    // return this.$currentBufferIndex === 0 ? 0 : this.$currentBufferIndex - 1;
    return this.$currentBufferIndex;
  }

  getOrderedDataSnapshot = () => {
    const orderedData = [];
    const startIndex = this.$currentBufferIndex + 1;
    const currLength = this.data.length;
    for (let i = 0; i < currLength; i++) {
      orderedData.push(this.data[(startIndex + i) % currLength]);
    }
    return orderedData;
  };

  // @computed
  // get MaxReachedBufferIndex() {
  //   return this.$maxReachedBufferIndex;
  // }

  get NumStoredItems() {
    return this.dataArrLength;
  }

  clearDataTimeout = () => {
    clearTimeout(this.$dataTimeout);
    // clearInterval(this.$dataTimeout);
  };

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
    const nextIndex = (this.$currentBufferIndex + 1) % this.dataArrLength;
    this.data[nextIndex] = data;
    this.$currentBufferIndex = nextIndex;
  };

  // @action
  // fill = data => {
  //   if (data == null) {
  //     return;
  //   }
  //   runInAction("Fill data", () => {
  //     // this.data[this.$currentBufferIndex] = Object.assign({}, data);
  //     this.data[this.$currentBufferIndex] = data;
  //     // save/update maximum reached buffer index
  //     if (this.$maxReachedBufferIndex < this.$currentBufferIndex) {
  //       this.$maxReachedBufferIndex = this.$currentBufferIndex;
  //     }
  //     this.$currentBufferIndex =
  //       this.$currentBufferIndex + 1 >= this.NumStoredItems
  //         ? 0
  //         : this.$currentBufferIndex + 1;
  //   });
  // };

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

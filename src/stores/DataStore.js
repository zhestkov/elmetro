// @flow
import { action, observable, computed } from "mobx";
import { call } from "../service/api";
import { regStore } from "./RegStore";

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

const NUM_STORED_VALUES: number = 3600;

export class DataStore {
  data: Array<DataEntry> = [];

  constructor() {
    // this.data = new Array(this.$maxDataArrLength);
    this.data = [];
  }

  @observable $currBufferIndex = -1;
  @observable $maxDataArrLength = NUM_STORED_VALUES;
  @observable $currNumChartPointsLimit = NUM_STORED_VALUES;

  $dataTimeout = null;

  @computed
  get CurrentBufIndex() {
    return this.$currBufferIndex;
  }

  getOrderedDataSnapshot = () => {
    const orderedData = [];
    const startIndex = this.$currBufferIndex + 1;
    const currLength = this.data.length;
    for (let i = 0; i < currLength; i++) {
      orderedData.push(this.data[(startIndex + i) % currLength]);
    }
    return currLength <= this.$currNumChartPointsLimit
      ? orderedData
      : orderedData.slice(currLength - this.$currNumChartPointsLimit);
  };

  @computed
  get DataArrLength() {
    return this.$maxDataArrLength;
  }

  @computed
  get NumChartPointsLimit() {
    return this.$currNumChartPointsLimit;
  }

  clearDataTimeout = () => {
    clearTimeout(this.$dataTimeout);
    // clearInterval(this.$dataTimeout);
  };

  @action
  updateChartLimits = numChartPointsLimit => {
    this.$currNumChartPointsLimit = numChartPointsLimit;
    if (numChartPointsLimit > this.$maxDataArrLength) {
      this.$maxDataArrLength = numChartPointsLimit;
    }
  };

  updateRegConfig = async () => {
    await regStore.regConfig.fetch();
  };

  @action
  watchData = () => {
    clearTimeout(this.$dataTimeout);
    // clearInterval(this.$dataTimeout);
    const { regSettings } = regStore;
    this.$dataTimeout = setTimeout(
      () => this.fetch(),
      regSettings.FetchPeriodSeconds * 1000
    );
    // this.$dataTimeout = setInterval(() => this.fetch(), 1000);
  };

  @action
  fetch = async () => {
    const data = await DataStore.fetch(`/RegData`);
    if (data.ConfigChangeCtr) {
      await this.updateRegConfig();
    }
    this.fill(data);
    this.watchData();
  };

  @action
  fill = data => {
    if (data == null) {
      return;
    }
    const nextIndex = (this.$currBufferIndex + 1) % this.$maxDataArrLength;
    this.data[nextIndex] = data;
    this.$currBufferIndex = nextIndex;
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

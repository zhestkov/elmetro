// @flow
import { action, observable, computed, runInAction } from "mobx";
import { call } from "../service/api";

const NUM_STORED_VALUES: number = 3;

export class DataStore {
  @observable AIData: Array = [];
  @observable AOData: Array = [];
  @observable DIData: Array = [];
  @observable DOData: Array = [];
  @observable TTLData: Array = [];
  @observable ConfigChangeCtr: number = 0;
  @observable Status: number = 0;
  @observable Timestamp: string = "";
  @observable $currentBufferIndex = 0;

  $dataTimeout = null;

  @computed
  get BufIndex() {
    return this.$currentBufferIndex === 0 ? 0 : this.$currentBufferIndex - 1;
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
    // debugger;
    this.fill(data);
    this.watchData();
  };

  @action
  fill = data => {
    if (data == null) {
      return;
    }
    // debugger;
    runInAction(() => {
      this.getAttributes().forEach(attr => {
        if (data[attr]) {
          if (Array.isArray(data[attr])) {
            this[attr][this.$currentBufferIndex] = data[attr];
            // this[attr][index] = data[attr];
          } else {
            this[attr] = data[attr];
          }
        }
      });
      this.$currentBufferIndex =
        this.$currentBufferIndex + 1 >= NUM_STORED_VALUES
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

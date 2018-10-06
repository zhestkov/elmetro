// @flow
import { action, computed, observable } from "mobx";
import { BaseModel } from "../models/BaseModel";
import { enumStore } from "./EnumStore";

export class DataStore extends BaseModel {
  @observable AIData: Array = [];
  @observable AOData: Array = [];
  @observable DIData: Array = [];
  @observable DOData: Array = [];
  @observable TTLData: Array = [];
  @observable ConfigChangeCtr: number = 0;
  @observable Status: number = 0;
  @observable Timestamp: string = "";
  // @observable $maxArrayLengthCache = 0;

  __dataTimeout = null;

  constructor(data = {}) {
    super(data);
  }

  clearDataTimeout = () => {
    clearTimeout(this.__dataTimeout);
  };

  watchData = () => {
    clearTimeout(this.__dataTimeout);
    this.__dataTimeout = setTimeout(() => this.fetch(), 1000);
  };

  @action
  fetch = async () => {
    const data = await DataStore.fetch(`/RegData`);
    this.fill(data);
    // if (this.$maxArrayLengthCache === 0) {
    //   this.$maxArrayLengthCache = this.MaxArrayLength;
    // }
    this.watchData();
  };

  // @computed
  // get MaxArrayLength() {
  //   // TODO: performance issue. Should be re-implemented.
  //   const wrap = [
  //     this.AIData,
  //     this.AOData,
  //     this.DIData,
  //     this.DOData,
  //     this.TTLData
  //   ];
  //   return Math.max(...wrap.map(arr => arr.length));
  // }

  @computed
  get DataAdapter() {
    const data = [];
    const { items: cfg } = enumStore.regConfig;
    let row = {};
    for (let i = 0; i < 60; i++) {
      row = {
        id: i + 1,
        AIData: this.AIData.length - 1 > i ? this.AIData[i] : "",
        AODAta: this.AOData.length - 1 > i ? this.AOData[i] : "",
        DIData: this.DIData.length - 1 > i ? this.DIData[i] : "",
        DOData: this.DOData.length - 1 > i ? this.DOData[i] : "",
        TTLData: this.TTLData.length - 1 > i ? this.TTLData[i] : "",

        AIConfig:
          cfg.AIConfig && cfg.AIConfig.length - 1 > i ? cfg.AIConfig[i] : "",
        AOConfig:
          cfg.AOConfig && cfg.AOConfig.length - 1 > i ? cfg.AOConfig[i] : "",
        DIConfig:
          cfg.DIConfig && cfg.DIConfig.length - 1 > i ? cfg.DIConfig[i] : "",
        DOConfig:
          cfg.DOConfig && cfg.DOConfig.length - 1 > i ? cfg.DOConfig[i] : "",
        TTLConfig:
          cfg.TTLConfig && cfg.TTLConfig.length - 1 > i ? cfg.TTLConfig[i] : ""
      };
      data.push(row);
    }
    return data;
  }
}

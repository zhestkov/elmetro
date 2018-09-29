// @flow
import { action, computed, observable } from "mobx";
import { BaseModel } from "../models/BaseModel";

export class DataStore extends BaseModel {
  @observable AIData: Array = [];
  @observable AOData: Array = [];
  @observable DIData: Array = [];
  @observable DOData: Array = [];
  @observable TTLData: Array = [];
  @observable ConfigChangeCtr: number = 0;
  @observable Status: number = 0;
  @observable Timestamp: string = "";

  __dataTimeout = null;

  constructor(data = {}) {
    super(data);
    // this.afterFill();
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
    this.watchData();
  };

  @computed
  get MaxArrayLength() {
    const wrap = [
      this.AIData,
      this.AOData,
      this.DIData,
      this.DOData,
      this.TTLData
    ];
    return Math.max(...wrap.map(arr => arr.length));
  }

  @computed
  get DataAdopter() {
    const data = [];
    const sz = this.MaxArrayLength;
    for (let i = 0; i < sz; i++) {
      const row = {
        id: i + 1,
        AIData: this.AIData.length - 1 >= i ? this.AIData[i] : "",
        AODAta: this.AOData.length - 1 >= i ? this.AOData[i] : "",
        DIData: this.DIData.length - 1 >= i ? this.DIData[i] : "",
        DOData: this.DOData.length - 1 >= i ? this.DOData[i] : "",
        TTLData: this.TTLData.length - 1 >= i ? this.TTLData[i] : ""
      };
      data.push(row);
    }
    return data;
  }
}

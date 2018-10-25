// @flow
import { action, observable } from "mobx";
import { BaseModel } from "../models/BaseModel";

export class DataStore extends BaseModel {
  @observable.ref AIData: Array = [];
  @observable.ref AOData: Array = [];
  @observable.ref DIData: Array = [];
  @observable.ref DOData: Array = [];
  @observable.ref TTLData: Array = [];
  @observable ConfigChangeCtr: number = 0;
  @observable Status: number = 0;
  @observable Timestamp: string = "";

  __dataTimeout = null;

  constructor(data = {}) {
    super(data);
  }

  clearDataTimeout = () => {
    clearTimeout(this.__dataTimeout);
    // clearInterval(this.__dataTimeout);
  };

  watchData = () => {
    clearTimeout(this.__dataTimeout);
    this.__dataTimeout = setTimeout(() => this.fetch(), 1000);
    // this.__dataTimeout = setInterval(() => this.fetch(), 1000);
  };

  @action
  fetch = async () => {
    const data = await DataStore.fetch(`/RegData`);
    this.fill(data);
    this.watchData();
  };
}

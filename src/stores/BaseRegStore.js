// @flow
import { action } from "mobx";
import { call } from "../service/api";

export class BaseRegStore {
  +storeName: string = "";
  +preload: boolean = true;

  @action
  load(data = {}) {
    this.fill(data);
  }
  @action
  fill = (data = {}) => {
    if (data != null) {
      Object.keys(data).forEach(key => {
        this[key] = data[key];
      });
    }
    this.afterFill();
  };

  @action afterFill = () => {};

  getAttributes = () =>
    Object.getOwnPropertyNames(this).filter(
      property =>
        property[0] !== "$" &&
        property[0] !== "_" &&
        typeof this[property] !== "function"
    );

  async fetch() {
    return call(`/${this.storeName}`).then(data => this.load(data));
  }
}

// @flow
import { observable, action } from "mobx";
import { call } from "../../service/api";

export class BaseEnumStore {
  +enumName: string = "";
  +preload: boolean = true;

  @observable items: Array = [];

  @action
  load(data) {
    this.items = data;
  }
  async fetch() {
    return call(`/${this.enumName}`).then(data => this.load(data));
  }
}

// @flow
import { observable } from "mobx";
import { BaseRegStore } from "./BaseRegStore";

export class RegInfoStore extends BaseRegStore {
  +storeName: string = "RegInfo";

  @observable DeviceInfo: * = {};
  @observable configuration: string = "";
  @observable manufacturer: string = "";
  @observable model: string = "";
  @observable serial: number = null;
  @observable swversion: string = "";
  @observable version: number = 1;
}

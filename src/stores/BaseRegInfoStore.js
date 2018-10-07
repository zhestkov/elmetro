// @flow
import { observable } from "mobx";
import { BaseRegStore } from "./BaseRegStore";

export class BaseRegInfoStore extends BaseRegStore {
  +enumName: string = "RegInfo";

  @observable DeviceInfo: * = {};
  @observable configuration: string = "";
  @observable manufacturer: string = "";
  @observable model: string = "";
  @observable serial: number = 0;
  @observable swversion: string = "";
  @observable version: number = 1;
}

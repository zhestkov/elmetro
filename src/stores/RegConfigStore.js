// @flow
import { observable } from "mobx";
import { BaseRegStore } from "./BaseRegStore";

export class RegConfigStore extends BaseRegStore {
  +storeName: string = "RegConfig";

  @observable AIConfig: Array = [];
  @observable AOConfig: Array = [];
  @observable DIConfig: Array = [];
  @observable DOConfig: Array = [];
  @observable DisplayConfig: Array = [];
  @observable TTLConfig: Array = [];
  @observable ConfigChangeCtr: number = 0;
}

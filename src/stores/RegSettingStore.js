// @flow
import { observable, action } from "mobx";
import { BaseRegStore } from "./BaseRegStore";

export class RegSettingStore extends BaseRegStore {
  +preload: boolean = false;

  +MIN_FONT_SIZE: number = 10;
  +MAX_FONT_SIZE: number = 32;

  +MIN_FETCH_PERIOD_SEC: number = 1;
  +MAX_FETCH_PERIOD_SEC: number = 60;

  +MIN_DISPLAY_INTERVAL: number = 1;
  +MAX_DISPLAY_INTERVAL: number = 168;

  @observable fontSize: number = 14;
  @observable secFetchPeriod: number = 1;
  @observable displayInterval: number = 10; // [1..168]

  @action setFontSize = size => (this.fontSize = size);

  @action setFetchPeriod = seconds => (this.secFetchPeriod = seconds);

  @action setDisplayInterval = interval => (this.displayInterval = interval);
}

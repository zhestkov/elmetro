// @flow
import { observable, action, computed } from "mobx";
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
  @observable fetchPeriodSeconds: number = 1;
  @observable displayIntervalHours: number = 1; // [1..24, offset: 0.1]

  @action setFontSize = (size: number) => (this.fontSize = size);

  @action
  setFetchPeriodSeconds = (seconds: number) =>
    (this.fetchPeriodSeconds = seconds);

  @action
  setDisplayIntervalHours = (hours: number) =>
    (this.displayIntervalHours = hours);

  @computed
  get FontSize() {
    return this.fontSize;
  }

  @computed
  get FetchPeriodSeconds() {
    return this.fetchPeriodSeconds;
  }

  @computed
  get DisplayIntervalHours() {
    return this.displayIntervalHours;
  }
}

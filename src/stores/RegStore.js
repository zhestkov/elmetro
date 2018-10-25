import { RegInfoStore } from "./RegInfoStore";
import { RegConfigStore } from "./RegConfigStore";
import { RegSettingStore } from "./RegSettingStore";

export const regStore = {
  regInfo: new RegInfoStore(),
  regConfig: new RegConfigStore(),
  regSettings: new RegSettingStore()
};

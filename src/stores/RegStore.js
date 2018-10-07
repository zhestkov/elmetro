import { BaseRegInfoStore } from "./BaseRegInfoStore";
import { BaseRegConfigStore } from "./BaseRegConfigStore";

export const regStore = {
  regInfo: new BaseRegInfoStore(),
  regConfig: new BaseRegConfigStore()
};

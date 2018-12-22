import { Pages } from "./Pages";
import { DataStore } from "./DataStore";
import { AllDataChannelsStore } from "./AllDataChannelsStore";

export * from "./RegStore";

export const pages = new Pages();
export const dataStore = new DataStore();
export const selectedChannels = new AllDataChannelsStore();

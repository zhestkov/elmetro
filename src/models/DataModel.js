// @flow
import { action, computed, observable } from "mobx";
import { BaseModel } from "./BaseModel";

export class DataModel extends BaseModel {
  @observable AIData: Array = [];
  @observable AOData: Array = [];
  @observable DIData: Array = [];
  @observable DOData: Array = [];
  @observable TTLData: Array = [];
  @observable ConfigChangeCtr: number = 0;
  @observable Status: number = 0;
  @observable Timestamp: string = "";
}
// @flow
import { action, computed, observable } from "mobx";
import moment from "moment";
import { call } from "../service/api";

export class BaseModel {
  constructor(data) {
    if (data !== null) {
      this.fill(data);
    }
  }
  @observable __dirty: Boolean = false;

  afterFill() {}

  static async fetch(endpoint, options = {}) {
    return call(endpoint, options);
  }

  static getLabel(field) {
    return this.getLabels()[field] || field;
  }

  static getValidationRules() {
    return {};
  }

  @computed
  get isDirty() {
    return this.__dirty;
  }

  @action
  fill = (data = {}) => {
    if (data != null) {
      this.getAttributes().forEach(attr => {
        if (data[attr]) {
          this[attr] = data[attr];
        }
      });
    }
    this.afterFill();
  };

  getValues = () => {
    const data = {};
    const DATE_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSS";
    this.getAttributes().forEach(attr => {
      if (
        typeof this[attr] === "boolean" ||
        this[attr] ||
        (this[attr] && this[attr].length)
      ) {
        if (moment.isMoment(this[attr])) {
          data[attr] = this[attr].isValid()
            ? this[attr].format(DATE_FORMAT)
            : null;
        } else {
          data[attr] = this[attr];
        }
      }
    });
    return data;
  };

  getAttributes = () =>
    Object.getOwnPropertyNames(this).filter(
      property =>
        property[0] !== "$" &&
        property[0] !== "_" &&
        typeof this[property] !== "function"
    );

  @action
  setAttribute = (field, value) => {
    if (this.getAttributes().indexOf(field) !== -1) {
      this[field] = value;
      this.__dirty = true;
      this.validateField(field);
    }
    return this;
  };

  getLabel(fieldName) {
    return this.constructor.getLabel(fieldName);
  }
}

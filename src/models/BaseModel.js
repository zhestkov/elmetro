// @flow
import { action, computed, observable } from "mobx";
import { call } from "../service/api";

export class BaseModel {
  constructor(data = {}) {
    this.fill(data);
  }
  @observable __dirty: Boolean = false;

  afterFill() {}

  static async fetch(endpoint, options = {}) {
    if (!options.method) {
      options.method = "GET";
    }

    if (options.body && !(options.body instanceof FormData)) {
      options.headers = {
        "content-type": "application/json;charset=UTF-8"
      };
      options.body = JSON.stringify(options.body);
    }

    const response = await call(endpoint, options);
    let responseData = null;

    try {
      responseData =
        options.method.toLowerCase() === "delete" ||
        options.body instanceof FormData
          ? await response.text()
          : (await response.json()) || "";
    } catch (e) {
      console.warn(e);
    }

    if (response.status >= 300) {
      responseData.status = response.status;
      throw responseData;
    }

    return responseData;
  }

  static getLabels() {
    return {};
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
    this.getAttributes().forEach(attr => {
      if (data[attr]) {
        this[attr] = data[attr];
      }
    });
    this.afterFill();
  };

  @action
  setAttribute = (field, value) => {
    if (this.getAttributes().indexOf(field) !== -1) {
      this[field] = value;
      this.__dirty = true;
      this.validateField(field);
    }
    return this;
  };

  getAttributes = () =>
    Object.getOwnPropertyNames(this).filter(
      property =>
        property[0] !== "$" &&
        property[0] !== "_" &&
        typeof this[property] !== "function"
    );

  getLabel(fieldName) {
    return this.constructor.getLabel(fieldName);
  }
}

// @flow
import React from "react";
import { observer, inject } from "mobx-react";
import { BaseTable } from "../../common/Table/BaseTable";
import { AllDataTableModel } from "../../../models/tables/AllDataTableModel";

type Props = {
  model: AllDataTableModel,
  dataStore: *,
  regStore: *
};

@observer
export class AllDataTable extends React.Component<Props> {
  getData = () => {
    const { regStore, dataStore } = this.props;
    const data = [];
    const {
      AIConfig,
      AOConfig,
      DIConfig,
      DOConfig,
      TTLConfig
    } = regStore.regConfig;
    const { DeviceInfo = {} } = regStore.regInfo;
    const AICount = DeviceInfo.AICount || 0;
    const AOCount = DeviceInfo.AOCount || 0;
    const DICount = DeviceInfo.DICount || 0;
    const DOCount = DeviceInfo.DOCount || 0;
    const TTLCount = DeviceInfo.TTLCount || 0;
    const sz = Math.max(AICount, AOCount, DICount, DOCount, TTLCount);
    const bufIndex = dataStore.CurrentBufIndex;
    let row = {};
    for (let i = 0; i < sz; i++) {
      row = {
        id: i + 1,
        AIData:
          dataStore.data.length &&
          dataStore.data[bufIndex] &&
          dataStore.data[bufIndex].AIData.length - 1 > i
            ? dataStore.data[bufIndex].AIData[i]
            : "",
        AOData:
          dataStore.data.length &&
          dataStore.data[bufIndex] &&
          dataStore.data[bufIndex].AOData.length - 1 > i
            ? dataStore.data[bufIndex].AOData[i]
            : "",
        DIData:
          dataStore.data.length &&
          dataStore.data[bufIndex] &&
          dataStore.data[bufIndex].DIData.length - 1 > i
            ? dataStore.data[bufIndex].DIData[i]
            : "",
        DOData:
          dataStore.data.length &&
          dataStore.data[bufIndex] &&
          dataStore.data[bufIndex].DOData.length - 1 > i
            ? dataStore.data[bufIndex].DOData[i]
            : "",
        TTLData:
          dataStore.data.length &&
          dataStore.data[bufIndex] &&
          dataStore.data[bufIndex].TTLData.length - 1 > i
            ? dataStore.data[bufIndex].TTLData[i]
            : "",

        AIConfig: AIConfig && AIConfig.length - 1 > i ? AIConfig[i] : "",
        AOConfig: AOConfig && AOConfig.length - 1 > i ? AOConfig[i] : "",
        DIConfig: DIConfig && DIConfig.length - 1 > i ? DIConfig[i] : "",
        DOConfig: DOConfig && DOConfig.length - 1 > i ? DOConfig[i] : "",
        TTLConfig: TTLConfig && TTLConfig.length - 1 > i ? TTLConfig[i] : ""
      };
      data.push(row);
    }

    return data;
  };

  renderTable = () => {
    const { model } = this.props;
    const data = this.getData();
    model.setData(data);
    return <BaseTable model={model} showPagination={false} />;
  };

  render() {
    return <div>{this.renderTable()}</div>;
  }
}

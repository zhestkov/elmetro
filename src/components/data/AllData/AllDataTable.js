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

@inject("dataStore", "regStore")
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
    const bufIndex = dataStore.BufIndex;
    let row = {};
    // debugger;
    for (let i = 0; i < sz; i++) {
      row = {
        id: i + 1,
        AIData:
          dataStore.AIData.length &&
          dataStore.AIData[bufIndex] &&
          dataStore.AIData[bufIndex].length - 1 > i
            ? dataStore.AIData[bufIndex][i]
            : "",
        AOData:
          dataStore.AOData.length &&
          dataStore.AOData[bufIndex] &&
          dataStore.AOData[bufIndex].length - 1 > i
            ? dataStore.AOData[bufIndex][i]
            : "",
        DIData:
          dataStore.DIData.length &&
          dataStore.DIData[bufIndex] &&
          dataStore.DIData[bufIndex].length - 1 > i
            ? dataStore.DIData[bufIndex][i]
            : "",
        DOData:
          dataStore.DOData.length &&
          dataStore.DOData[bufIndex] &&
          dataStore.DOData[bufIndex].length - 1 > i
            ? dataStore.DOData[bufIndex][i]
            : "",
        TTLData:
          dataStore.TTLData.length &&
          dataStore.TTLData[bufIndex] &&
          dataStore.TTLData[bufIndex].length - 1 > i
            ? dataStore.TTLData[bufIndex][i]
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

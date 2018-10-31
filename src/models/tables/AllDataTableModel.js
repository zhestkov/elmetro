// @flow
import { action, observable, computed } from "mobx";
import { BaseTableModel } from "../BaseTableModel";

export class AllDataTableModel extends BaseTableModel {
  @observable total = 0;
  @observable pageSize = 60; // TODO: hardcoded. Fix it ASAP

  @observable
  columns = [
    {
      field: "id",
      Header: "№",
      // accessor: "id",
      width: 30
    },
    {
      field: "AIData",
      Header: "АВ, МВ, ЧВ",
      accessor: "AIData",
      width: 100
    },
    {
      id: "AIConfigUnits",
      field: "AIConfigUnits",
      Header: "Ед. изм.",
      accessor: ({ AIConfig }) => AIConfig.Units || "",
      width: 80
    },
    {
      id: "AIConfigDesc",
      field: "AIConfigDesc",
      Header: "Описание",
      accessor: ({ AIConfig }) => AIConfig.Desc || "",
      width: 100
    },
    {
      field: "AOData",
      Header: "АЕ",
      accessor: "AOData",
      width: 50
    },
    {
      id: "AOConfigDesc",
      field: "AOConfigDesc",
      Header: "Описание",
      accessor: ({ AOConfig }) => AOConfig.Desc || "",
      width: 140
    },
    {
      field: "DIData",
      accessor: "DIData",
      Header: "ДВ",
      width: 50
    },
    {
      id: "DIConfigDesc",
      field: "DIConfigDesc",
      Header: "Описание",
      accessor: ({ DIConfig }) => DIConfig.Desc || "",
      width: 160
    },
    {
      field: "DOData",
      accessor: "DOData",
      Header: "Р",
      width: 30
    },
    {
      id: "DOConfigDesc",
      field: "DOConfigDesc",
      Header: "Описание",
      accessor: ({ DOConfig }) => DOConfig.Desc || "",
      width: 60
    },
    {
      field: "TTLData",
      accessor: "TTLData",
      Header: "СМ",
      width: 60
    },
    {
      id: "TTLConfigUnits",
      field: "TTLConfigUnits",
      Header: "Ед. изм.",
      accessor: ({ TTLConfig }) => TTLConfig.Units,
      width: 80
    },
    {
      id: "TTLConfigDesc",
      field: "TTLConfigDesc",
      Header: "Описание",
      accessor: ({ TTLConfig }) => TTLConfig.Desc || "",
      width: 100
    }
  ];

  // @computed
  // get DataAdapter() {
  //   const data = [];
  //   const {
  //     AIConfig,
  //     AOConfig,
  //     DIConfig,
  //     DOConfig,
  //     TTLConfig
  //   } = regStore.regConfig;
  //   const { DeviceInfo = {} } = regStore.regInfo;
  //   const AICount = DeviceInfo.AICount || 0;
  //   const AOCount = DeviceInfo.AOCount || 0;
  //   const DICount = DeviceInfo.DICount || 0;
  //   const DOCount = DeviceInfo.DOCount || 0;
  //   const TTLCount = DeviceInfo.TTLCount || 0;
  //   const sz = Math.max(AICount, AOCount, DICount, DOCount, TTLCount);
  //   const bufIndex = dataStore.getBufIndex() || 0;
  //   let row = {};
  //   console.log(bufIndex);
  //   // debugger;
  //   for (let i = 0; i < sz; i++) {
  //     row = {
  //       id: i + 1,
  //       AIData: dataStore.AIData.length - 1 > i ? dataStore.AIData[i] : "",
  //       AODAta: dataStore.AOData.length - 1 > i ? dataStore.AOData[i] : "",
  //       DIData: dataStore.DIData.length - 1 > i ? dataStore.DIData[i] : "",
  //       DOData: dataStore.DOData.length - 1 > i ? dataStore.DOData[i] : "",
  //       TTLData: dataStore.TTLData.length - 1 > i ? dataStore.TTLData[i] : "",
  //
  //       AIConfig: AIConfig && AIConfig.length - 1 > i ? AIConfig[i] : "",
  //       AOConfig: AOConfig && AOConfig.length - 1 > i ? AOConfig[i] : "",
  //       DIConfig: DIConfig && DIConfig.length - 1 > i ? DIConfig[i] : "",
  //       DOConfig: DOConfig && DOConfig.length - 1 > i ? DOConfig[i] : "",
  //       TTLConfig: TTLConfig && TTLConfig.length - 1 > i ? TTLConfig[i] : ""
  //     };
  //     data.push(row);
  //   }
  //
  //   if (data.length) {
  //     this.setPageSize(data.length);
  //   }
  //   return data;
  // }

  @action fetch = () => {};
}

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

  @action fetch = () => {};
}

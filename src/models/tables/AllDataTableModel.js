// @flow
import { action, observable } from "mobx";
import { BaseTableModel } from "../BaseTableModel";

export class AllDataTableModel extends BaseTableModel {
  @observable total = 0;
  @observable pageSize = 60;

  columns = [
    {
      Header: "№",
      accessor: "id",
      width: 30
    },
    {
      Header: "АВ, МВ, ЧВ",
      accessor: "AIData",
      width: 100
    },
    {
      Header: "Ед. изм.",
      id: "AIConfigUnits",
      accessor: ({ AIConfig }) => AIConfig.Units || "",
      width: 80
    },
    {
      Header: "Описание",
      id: "AIConfigDesc",
      accessor: ({ AIConfig }) => AIConfig.Desc || "",
      width: 100
    },
    {
      Header: "АЕ",
      accessor: "AOData",
      width: 50
    },
    {
      Header: "Описание",
      id: "AOConfigDesc",
      accessor: ({ AOConfig }) => AOConfig.Desc || "",
      width: 140
    },
    {
      Header: "ДВ",
      accessor: "DIData",
      width: 50
    },
    {
      Header: "Описание",
      id: "DIConfigDesc",
      accessor: ({ DIConfig }) => DIConfig.Desc || "",
      width: 160
    },
    {
      Header: "Р",
      accessor: "DOData",
      width: 30
    },
    {
      Header: "Описание",
      id: "DOConfigDesc",
      accessor: ({ DOConfig }) => DOConfig.Desc || "",
      width: 60
    },
    {
      Header: "СМ",
      accessor: "TTLData",
      width: 60
    },
    {
      Header: "Ед. изм.",
      id: "TTLConfigUnits",
      accessor: ({ TTLConfig }) => TTLConfig.Units,
      width: 80
    },
    {
      Header: "Описание",
      id: "TTLConfigDesc",
      accessor: ({ TTLConfig }) => TTLConfig.Desc || "",
      width: 100
    }
  ];

  @action
  fetch = () => {
    console.log("fetching: AllDataTableModel");
  };
}

// @flow
import { action, observable, computed } from "mobx";
import { BaseTableModel } from "../BaseTableModel";

export class AllDataTableModel extends BaseTableModel {
  @observable total = 0;
  @observable pageSize = 60;

  // _adopterFunc = null;
  //
  // constructor(id: string, adopter?: *) {
  //   super(id);
  //   if (adopter && typeof adopter === "function") {
  //     this._adopterFunc = adopter;
  //   }
  // }

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
      accessor: "units1",
      width: 80
    },
    {
      Header: "АЕ",
      accessor: "AOData",
      width: 50
    },
    {
      Header: "Описание",
      accessor: "description1",
      width: 100
    },
    {
      Header: "ДВ",
      accessor: "DIData",
      width: 50
    },
    {
      Header: "Описание",
      accessor: "description2",
      width: 100
    },
    {
      Header: "Р",
      accessor: "DOData",
      width: 30
    },
    {
      Header: "Описание",
      accessor: "description3",
      width: 100
    },
    {
      Header: "СМ",
      accessor: "TTLData",
      width: 60
    },
    {
      Header: "Ед. изм.",
      accessor: "units2",
      width: 80
    },
    {
      Header: "Описание",
      accessor: "description4",
      width: 100
    }
  ];

  @action
  fetch = () => {
    console.log("fetching: AllDataTableModel");
    // if (this._adopterFunc) {
    //   const data = this._adopterFunc();
    //   debugger;
    //   this.setData(data);
    // }
  };
}

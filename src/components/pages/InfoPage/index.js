// @flow
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { ButtonAntd } from "../../common/ButtonAntd";
import { InfoTableModel } from "../../../models/tables/InfoTableModel";
import { BaseTable } from "../../common/Table/BaseTable";

const SOFTWARE_VERSION_LABEL = "Software Version";
const CONFIGURATION_LABEL = "Configuration";
const SERIAL_LABEL = "Serial";

@inject("history", "enumStore")
@observer
export class InfoPage extends Component {
  state = {
    infoTableModel: new InfoTableModel("info-table")
  };

  getData = () => {
    const data = [];
    const {
      enumStore: { regInfo }
    } = this.props;
    const { configuration, serial, swversion } = regInfo.items;
    const info = {
      [CONFIGURATION_LABEL]: configuration,
      [SERIAL_LABEL]: serial,
      [SOFTWARE_VERSION_LABEL]: swversion
    };
    Object.keys(info).forEach(key => {
      data.push({
        name: key,
        value: info[key]
      });
    });
    return data;
  };

  render() {
    const { infoTableModel } = this.state;
    const data = this.getData();
    infoTableModel.setData(data);
    infoTableModel.setTotal(data.length);
    return (
      <div>
        Info Page
        <ButtonAntd style={{ margin: "20px 10px" }}>Save</ButtonAntd>
        <BaseTable model={infoTableModel} columns={infoTableModel.columns} />
      </div>
    );
  }
}

// @flow
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import moment from "moment";
import { ButtonAntd } from "../../common/ButtonAntd";
import { InfoTableModel } from "../../../models/tables/InfoTableModel";
import { BaseTable } from "../../common/Table/BaseTable";
import { call } from "../../../service/api";

import * as styles from "./styles.css";

const SOFTWARE_VERSION_LABEL = "Software Version";
const CONFIGURATION_LABEL = "Configuration";
const SERIAL_LABEL = "Serial";
const STATUS_LABEL = "Status";
const TIME_LABEL = "Current Reg.Time";

const REG_STATUS_OK = "OK";
const REG_STATUS_FAILURE = "FAILURE";

@inject("history", "enumStore")
@observer
export class InfoPage extends Component {
  state = {
    infoTableModel: new InfoTableModel("info-table"),
    regTime: { Status: "" }
  };

  componentDidMount() {
    this.watchRegTime();
  }
  componentWillUnmount() {
    clearTimeout(this.__regTimeTimeout);
  }
  __regTimeTimeout = null;

  updateRegTime = async () => {
    try {
      const {
        Status = REG_STATUS_FAILURE,
        time = moment().format("YYYY-MM-DD HH:mm:ss")
      } = await call(`/RegTime`);
      this.setState({
        regTime: {
          Status: Status === 0 ? REG_STATUS_OK : REG_STATUS_FAILURE,
          time
        }
      });
      this.watchRegTime();
    } catch (e) {
      this.setState({ Status: REG_STATUS_FAILURE });
    }
  };

  watchRegTime = () => {
    clearTimeout(this.__regTimeTimeout);
    this.__regTimeTimeout = setTimeout(this.updateRegTime, 1000);
  };

  getData = () => {
    const { regTime } = this.state;
    const data = [];
    const {
      enumStore: { regInfo }
    } = this.props;
    const { configuration, serial, swversion } = regInfo.items;
    const info = {
      [CONFIGURATION_LABEL]: configuration,
      [SERIAL_LABEL]: serial,
      [SOFTWARE_VERSION_LABEL]: swversion,
      [TIME_LABEL]: regTime.time,
      [STATUS_LABEL]: regTime.Status
    };
    Object.keys(info).forEach(key => {
      data.push({
        attribute: key,
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
        <div className={styles.infoTable}>
          <BaseTable
            model={infoTableModel}
            columns={infoTableModel.columns}
            showPagination={false}
          />
        </div>
      </div>
    );
  }
}

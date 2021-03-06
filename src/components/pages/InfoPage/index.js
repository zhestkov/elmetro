// @flow
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import moment from "moment";
import { InfoTableModel } from "../../../models/tables/InfoTableModel";
import { BaseTable } from "../../common/Table/BaseTable";
import { BaseModel } from "../../../models/BaseModel";

import * as styles from "./info-page.less";

const SOFTWARE_VERSION_LABEL = "Версия ПО";
const CONFIGURATION_LABEL = "Конфигурация";
const SERIAL_LABEL = "Заводской номер";
const STATUS_LABEL = "Статус";
const TIME_LABEL = "Текущее время регистратора";

const REG_STATUS_OK = "OK";
const REG_STATUS_FAILURE = "FAILURE";
const FETCHING_LABEL = "Загрузка...";

const REGISTER_PIC_PATH = "/images/M-7.png";

type Props = {
  history: *,
  regStore: *
};

type State = {
  infoTableModel: InfoTableModel,
  Status: string,
  time?: moment | string
};

@inject("history", "regStore")
@observer
export class InfoPage extends Component<Props, State> {
  state = {
    infoTableModel: new InfoTableModel("info-table"),
    Status: "",
    time: ""
  };

  componentDidMount() {
    this.watchRegTime();
  }
  componentWillUnmount() {
    clearTimeout(this.__regTimeTimeout);
  }
  __regTimeTimeout = undefined;

  updateRegTime = async () => {
    try {
      const {
        Status = REG_STATUS_FAILURE,
        time = moment()
      } = await BaseModel.fetch(`/RegTime`);
      this.setState({
        Status: Status === 0 ? REG_STATUS_OK : REG_STATUS_FAILURE,
        time: moment(time, "YYYY/MM/DD HH:mm:ss")
      });
      this.watchRegTime();
    } catch (e) {
      this.setState({ Status: `${REG_STATUS_FAILURE}: ${e.message}` });
    }
  };

  watchRegTime = () => {
    clearTimeout(this.__regTimeTimeout);
    this.__regTimeTimeout = setTimeout(this.updateRegTime, 1000);
  };

  getData = () => {
    const { time, Status } = this.state;
    const data = [];
    const {
      regStore: { regInfo }
    } = this.props;
    const { configuration, serial, swversion } = regInfo;
    const info = {
      [CONFIGURATION_LABEL]: configuration,
      [SERIAL_LABEL]: serial,
      [SOFTWARE_VERSION_LABEL]: swversion,
      [TIME_LABEL]: time ? time.format("YYYY-MM-DD HH:mm:ss") : FETCHING_LABEL,
      [STATUS_LABEL]: Status
    };
    Object.keys(info).forEach(key => {
      data.push({
        attribute: key,
        value: info[key]
      });
    });
    return data;
  };

  renderTable = () => {
    const { infoTableModel } = this.state;
    const data = this.getData();
    infoTableModel.setData(data);
    infoTableModel.setTotal(data.length);
    return (
      <div className={styles.infoTable}>
        <BaseTable model={infoTableModel} showPagination={false} />
      </div>
    );
  };

  render() {
    return (
      <div className={styles.infoWrapper}>
        <img src={REGISTER_PIC_PATH} />
        {this.renderTable()}
      </div>
    );
  }
}

// @flow
import React from "react";
import { observer, inject } from "mobx-react";
import { BaseTable } from "../../common/Table/BaseTable";
import { SettingsTableModel } from "../../../models/tables/SettingsTableModel";
import { SliderAntd } from "../../common/SliderAntd/SliderAntd";

import * as styles from "./settings.less";

const FONT_SIZE_SLIDER: string = "change_font_size";
const FETCH_PERIOD_SLIDER: string = "fetch_period_seconds";
const DISPLAY_INTERVAL_SLIDER: string = "display_inverval_hours";

const FONT_SIZE_LABEL: string = "Font size";
const FETCH_PERIOD_LABEL: string = "Fetch period, sec";
const DISPLAY_INTERVAL_LABEL: string = "Display data interval, hours";

@inject("regStore")
@observer
export class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsTable: new SettingsTableModel("setting-table")
    };
    this.sliderOptions = this.getSliderOptions();
    this.tableData = this.getInitialTableData();
  }

  getInitialTableData = () => {
    const data = [];
    const optionKeys = Object.keys(this.sliderOptions);
    optionKeys.forEach(optKey => {
      data.push({
        description: this.sliderOptions[optKey].label,
        value: this.sliderOptions[optKey]
      });
    });
    return data;
  };

  getSliderOptions = () => {
    const {
      regStore: { regSettings }
    } = this.props;
    return {
      [FONT_SIZE_SLIDER]: {
        id: 0,
        label: FONT_SIZE_LABEL,
        defaultValue: regSettings.FontSize, // px
        min: 10,
        max: 32,
        onChange: val => this.onChangeFontSize(val)
      },
      [FETCH_PERIOD_SLIDER]: {
        id: 1,
        label: FETCH_PERIOD_LABEL,
        defaultValue: regSettings.FetchPeriodSeconds, // seconds
        min: 1,
        max: 60,
        onChange: val => this.onChangeFetchPeriodSeconds(val)
      },
      [DISPLAY_INTERVAL_SLIDER]: {
        id: 2,
        label: DISPLAY_INTERVAL_LABEL,
        defaultValue: regSettings.DisplayIntervalHours, // hours
        min: 0.1,
        max: 24,
        step: 0.1,
        onChange: val => this.onChangeDisplayIntervalHours(val)
      }
    };
  };

  columns = {
    value: () => ({
      Cell: ({ original }) => {
        return (
          <div className={styles.sliderColumn}>
            <div>{original.value.defaultValue}</div>
            <SliderAntd {...original.value} />
          </div>
        );
      }
    })
  };
  onChangeFontSize = size => {
    const {
      regStore: { regSettings }
    } = this.props;
    regSettings.setFontSize(size);
  };

  onChangeFetchPeriodSeconds = period => {
    const {
      regStore: { regSettings }
    } = this.props;
    regSettings.setFetchPeriodSeconds(period);
  };

  onChangeDisplayIntervalHours = hours => {
    const {
      regStore: { regSettings }
    } = this.props;
    regSettings.setDisplayIntervalHours(hours);
  };

  render() {
    this.state.settingsTable.setData(this.tableData);
    return (
      <div className={styles.tableWrapper}>
        <BaseTable
          model={this.state.settingsTable}
          customColumns={this.columns}
          showPagination={false}
        />
      </div>
    );
  }
}

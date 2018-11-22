// @flow
import React from "react";
import { Select } from "antd";
import classNames from "classnames";

import * as styles from "./styles.less";

const Option = Select.Option;

type OptionType = {
  id?: string,
  name?: string,
  label?: string,
  value?: string
};

type Props = {
  value?: *,
  onChange: () => void,
  onSelect: () => void,
  options: Array<OptionType>
};

export class SelectAntd extends React.Component<Props> {
  state = {
    options: [],
    isResultEmpty: false,
    displayValue: undefined
  };
  componentWillMount() {
    this.setOptions();
  }
  setOptions = () => {
    const options = this.transformOptions(this.props.options);
    this.setState({ options });
  };
  setValue = value => {
    if (value instanceof Promise) {
      value.then(newValue => {
        this.setState({
          displayValue: newValue ? newValue.name : ""
        });
      });
    } else if (value !== -1) {
      this.setState({
        displayValue:
          value && !this.props.clearOnSelect ? value.name : undefined
      });
    }
  };

  transformOptions = options =>
    options.map(option => {
      const value = { ...option };
      if (option.label) {
        value.name = option.label;
      }
      return { name: value.name || option, value };
    });

  renderOptions = () => {
    const { options, displayValue } = this.props;
    return options.map(({ value }) => <Option value={value}>{value}</Option>);
  };
  render() {
    const { displayValue, ...rest } = this.props;
    return (
      <React.Fragment>
        <Select
          {...rest}
          value={displayValue}
          allowClear={true}
          onChange={() => {}}
          className={styles.selectWrapper}
        >
          {this.renderOptions()}
        </Select>
      </React.Fragment>
    );
  }
}

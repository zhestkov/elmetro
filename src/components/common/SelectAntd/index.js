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
  value?: string,
  clearOnSelect?: Function,
  onChange?: Function
};

type Props = {
  value?: *,
  onChange?: () => void,
  onSelect?: () => void,
  clearOnSelect: () => void,
  options: Array<OptionType>
};

export class SelectAntd extends React.Component<Props> {
  constructor(props) {
    super(props);
    const options = this.transformOptions(props.options);
    this.state = {
      options,
      isResultEmpty: false,
      displayedValue: options[0].id
    };
  }

  setOptions = () => {
    const options = this.transformOptions(this.props.options);
    this.setState({ options });
  };

  handleChange = id => {
    const { onChange } = this.props;
    const data = this.state.options.find(
      opt => opt.id === id || opt.value.description === id
    );
    const { value: newValue } = data;
    if (onChange) {
      onChange(id);
    }
    this.setValue(newValue);
  };

  setValue = value => {
    if (value instanceof Promise) {
      value.then(newValue => {
        this.setState({
          displayedValue: newValue ? newValue.name : ""
        });
      });
    } else if (value !== -1) {
      this.setState({
        displayedValue:
          value && !this.props.clearOnSelect
            ? value.name || value.description
            : undefined
      });
    }
  };

  transformOptions = options =>
    options.map(option => {
      const value = { ...option };
      if (option.label) {
        value.name = option.label;
      }
      return { id: value.name, value };
    });

  renderOptions = () => {
    const { options } = this.state;
    return options.map(({ id, value }, index) => {
      const valueId = id.length ? id : value.description || index;
      const valueLabel = value.name || value.description;
      return (
        <Option value={valueId} key={valueId}>
          {valueLabel}
        </Option>
      );
    });
  };

  render() {
    const { allowClear = false, ...rest } = this.props;
    const { displayedValue } = this.state;
    return (
      <React.Fragment>
        <Select
          {...rest}
          value={displayedValue}
          allowClear={allowClear}
          onChange={this.handleChange}
          className={styles.selectWrapper}
        >
          {this.renderOptions()}
        </Select>
      </React.Fragment>
    );
  }
}

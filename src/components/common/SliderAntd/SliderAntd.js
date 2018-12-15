// @flow
import React from "react";
import classNames from "classnames";
import { Slider } from "antd";
import styles from "./slider.less";

type Props = {
  onChange: () => void,
  defaultValue: number,
  min: number,
  max: number,
  step: number,
  value?: number,
  className?: string,
  labeled?: boolean,
  labelPos?: "top" | "bottom",
  ...rest
};

export class SliderAntd extends React.Component<Props> {
  state = {
    value: null
  };
  onChange = value => {
    const { onChange } = this.props;
    this.setState({ value });
    if (onChange) {
      onChange(value);
    }
  };

  renderLabel = (label: string) => <div>{label}</div>;

  render() {
    const {
      defaultValue,
      value,
      min,
      max,
      step = 1,
      labeled,
      labelPos,
      ...rest
    } = this.props;
    const val = this.state.value || value || defaultValue;
    return (
      <div className={styles.sliderWrapper}>
        {labeled && labelPos === "top" && this.renderLabel(val)}
        <Slider
          {...rest}
          defaultValue={defaultValue}
          value={val}
          min={min}
          max={max}
          step={step}
          onChange={this.onChange}
          className={styles.slider}
        />
        {labeled && labelPos === "bottom" && this.renderLabel(val)}
      </div>
    );
  }
}

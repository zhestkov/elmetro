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
  ...rest
};

export class SliderAntd extends React.Component<Props> {
  state = {
    value: null
  };
  onChange = value => {
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    const { defaultValue, value, min, max, step = 1, ...rest } = this.props;
    const val = this.state.value || value || defaultValue;
    return (
      <div className={styles.sliderWrapper}>
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
      </div>
    );
  }
}

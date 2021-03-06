// @flow
import React from "react";
import { Icon } from "antd";
import { DropDownAntd } from "../../../common/DropdownAntd/DropdownAntd";
import * as styles from "./ColorPicker.less";

type State = {
  color: string
};

type Props = {
  colors: Array<string>,
  defaultColor: string,
  onChange: Function
};
export class ColorPicker extends React.Component<Props, State> {
  state = {
    color:
      this.props.defaultColor ||
      (this.props.colors && this.props.colors[0]) ||
      ""
  };

  handleColorPick = e => {
    const { id: newColor } = e.target;
    this.setState({ color: newColor });
    this.props.onChange(newColor);
  };

  renderColorList = () => {
    const { colors } = this.props;
    return (
      <div className={styles.colorsWrapper}>
        {colors.map(color => (
          <div
            id={color}
            key={color}
            onClick={this.handleColorPick}
            className={styles.colorItem}
            style={{ background: color }}
          />
        ))}
      </div>
    );
  };

  render() {
    return (
      <div className={styles.colorPicker}>
        <DropDownAntd overlay={this.renderColorList()} trigger={["click"]}>
          <div className={styles.dropdownWrapper}>
            <a>
              Цвет <Icon type="down" />
            </a>
          </div>
        </DropDownAntd>
        <div
          className={styles.currentColor}
          style={{ background: this.state.color || "transparent" }}
        />
      </div>
    );
  }
}

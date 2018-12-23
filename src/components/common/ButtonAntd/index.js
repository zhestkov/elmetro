// @flow
import React, { Component } from "react";
import { Button } from "antd";
import classNames from "classnames";
import * as styles from "./button.less";

const ButtonGroup = Button.Group;

type Props = {
  className?: string,
  children?: *,
  disabled?: boolean,
  onClick?: Function,
  transparent?: boolean,
  type?: string,
  small?: boolean,
  loading?: boolean,
  icon?: *,
  style?: Object,
  filled?: boolean,
  primary?: boolean,
  success?: boolean,
  warning?: boolean,
  info?: boolean,
  secondary?: boolean,
  ...rest
};

export class ButtonAntd extends Component<Props> {
  getClassName = (): string => {
    const {
      className,
      primary,
      success,
      info,
      secondary,
      warning,
      filled
    } = this.props;
    return classNames(
      styles.container,
      className,
      filled ? styles.filled : null,
      primary ? styles.primary : null,
      success ? styles.success : null,
      info ? styles.info : null,
      warning ? styles.warning : null,
      secondary ? styles.secondary : null
    );
  };
  getType = (): string => {
    const { type, filled, danger } = this.props;
    const typeVariants = {
      primary: filled,
      danger
    };
    const newType = Object.keys(typeVariants).find(t => typeVariants[t]);
    return type || newType;
  };

  render() {
    const {
      children,
      type,
      small,
      onClick,
      loading,
      icon,
      style,
      transparent,
      ...rest
    } = this.props;
    return (
      <Button
        size={small ? "small" : "default"}
        {...rest}
        className={this.getClassName()}
        type={this.getType()}
        htmlType={type || "button"}
        ghost={transparent}
        onClick={onClick}
        loading={loading}
        icon={icon}
        style={style}
      >
        {children}
      </Button>
    );
  }
}

export const ButtonGroupAntd = ({ children }: { children?: Array<Button> }) => (
  <ButtonGroup>{children}</ButtonGroup>
);

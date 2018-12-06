import React from "react";
import classNames from "classnames";
import { Dropdown } from "antd";
import styles from "./styles.less";

export function DropDownAntd({ className, overlay, trigger, ...rest }) {
  return (
    <div className={styles.dropDownBox}>
      <Dropdown
        {...rest}
        overlay={overlay}
        trigger={trigger}
        className={classNames(className || "", styles.dropdown)}
      />
    </div>
  );
}

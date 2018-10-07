// @flow
import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import * as styles from "./styles.less";

type Props = {
  to: string,
  children?: React.Children,
  className?: string
};

export class LinkedItem extends React.Component<Props> {
  render() {
    const { children, to, className, ...rest } = this.props;
    return (
      <Link
        to={to}
        className={classNames(styles.linkedItem, className)}
        {...rest}
      >
        {children}
      </Link>
    );
  }
}

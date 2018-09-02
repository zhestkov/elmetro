// @flow
import React, { Component } from "react";
import * as styles from "./styles.css";

type Props = {
  path: { label: string, link: string }[],
  children?: *
};
export class Header extends Component<Props> {
  render() {
    return (
      <div className={styles.header}>
        <img className={styles.headerImage} src="images/logo.png" />
      </div>
    );
  }
}

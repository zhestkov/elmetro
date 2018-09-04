// @flow
import React, { Component } from "react";
import { Layout, Menu } from "antd";
import * as styles from "./styles.css";
import "antd/lib/menu/style/css";
type Props = {
  paths: { label: string, link?: string }[],
  children?: *
};

const HeaderAntd = Layout.Header;
const { Item } = Menu;

export class Header extends Component<Props> {
  render() {
    const { paths } = this.props;
    return (
      <div>
        <HeaderAntd className={styles.header}>
          <div className={styles.logo}>
            <img src="images/logo.png" />
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={["0"]}
            style={{ lineHeight: "64px", background: "#f0f2f5" }}
          >
            {paths.map((path, index) => (
              <Item key={index}>{path.label}</Item>
            ))}
          </Menu>
        </HeaderAntd>
      </div>
    );
  }
}

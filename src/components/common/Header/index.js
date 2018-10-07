// @flow
import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { inject } from "mobx-react";
import { LinkedItem } from "./LinkedItem";
import { Pages } from "../../../stores/Pages";

import * as styles from "./styles.less";

type Props = {
  paths: { label: string, link?: string }[],
  match: *,
  children?: *
};

const HeaderAntd = Layout.Header;

@inject("pages")
export class Header extends Component<Props> {
  renderMenuItem = (page: *) => {
    const { match } = this.props;
    const isActive = page.id === match.params.page;
    return (
      <Menu.Item key={page.id}>
        <LinkedItem to={page.path}>{page.title}</LinkedItem>
      </Menu.Item>
    );
  };

  render() {
    const {
      pages,
      match: {
        params: { page }
      }
    } = this.props;
    return (
      <div className={styles.headerContainer}>
        <HeaderAntd className={styles.header}>
          <div className={styles.logo}>
            <LinkedItem to="/">
              <img src="images/logo.png" />
            </LinkedItem>
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[page || Pages.PAGE_REG_INFO]}
            style={{ lineHeight: "64px", background: "#f0f2f5" }}
          >
            {pages.list.map(this.renderMenuItem)}
          </Menu>
        </HeaderAntd>
      </div>
    );
  }
}

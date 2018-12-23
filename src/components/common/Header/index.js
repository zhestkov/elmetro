// @flow
import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { inject } from "mobx-react";
import { LinkedItem } from "./LinkedItem";
import { Pages } from "../../../stores/Pages";

import * as styles from "./header.less";

type Props = {
  paths: { label: string, link?: string }[],
  match: *,
  children?: *
};

const HeaderAntd = Layout.Header;
const LOGO_PATH = "images/logo.png";

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
        <HeaderAntd>
          <div className={styles.logo}>
            <LinkedItem to="/">
              <img src={LOGO_PATH} />
            </LinkedItem>
          </div>
          <Menu
            className={styles.menuWrapper}
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[page || Pages.PAGE_REG_INFO]}
          >
            {pages.list.map(this.renderMenuItem)}
          </Menu>
        </HeaderAntd>
      </div>
    );
  }
}

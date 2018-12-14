// @flow
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Layout } from "antd";
import { inject } from "mobx-react";
import { Header } from "../Header/index";
import { Pages } from "../../../stores/Pages";

import { InfoPage } from "../../pages/InfoPage";
import { DataPage } from "../../pages/DataPage";
import { SettingsPage } from "../../pages/SettingsPage";

import "rc-slider/assets/index.css";
import * as styles from "./styles.less";

const paths = [
  {
    label: "Reg. Info"
  },
  {
    label: "Reg. Data"
  },
  {
    label: "Reg. settings"
  }
];
const { Content } = Layout;

const components = {
  [Pages.PAGE_REG_INFO]: InfoPage,
  [Pages.PAGE_REG_DATA]: DataPage,
  [Pages.PAGE_REG_SETTINGS]: SettingsPage
};

type Props = {
  match: *,
  pages: *
};

@inject("pages", "regStore")
export default class Container extends Component<Props> {
  componentWillMount() {
    const { regStore } = this.props;
    Object.keys(regStore).forEach(key => {
      if (regStore[key].preload) {
        regStore[key].fetch();
      }
    });
  }

  static renderPage(page: *) {
    const Comp = components[page.id];
    return <Route exact path={page.path} key={page.id} component={Comp} />;
  }

  render() {
    const { pages } = this.props;
    return (
      <Layout className={styles.container}>
        <Header paths={paths} match={this.props.match} />
        <Content className={styles.content}>
          <Switch>
            {pages.list.map(Container.renderPage, this)}
            <Redirect to={`/${Pages.PAGE_REG_INFO}`} />
          </Switch>
        </Content>

        <footer className={styles.footer}>
          <div>
            <b>Contact us: zav@elmetro.ru</b> <br />
            Some inspiring conclusion here
          </div>
        </footer>
      </Layout>
    );
  }
}

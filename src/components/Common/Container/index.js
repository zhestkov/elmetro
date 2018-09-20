// @flow
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Layout } from "antd";
import { inject } from "mobx-react";
import { Header } from "../Header/index";
import { Pages } from "../../../stores/Pages";

import { InfoPage } from "../../pages/InfoPage";
import { DataPage } from "../../pages/DataPage";

import "rc-slider/assets/index.css";
import * as styles from "./common.css";

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
  [Pages.PAGE_REG_DATA]: DataPage
};

type Props = {
  match: *,
  pages: *
};

@inject("pages")
export default class Container extends Component<Props> {
  static renderPage(page: *) {
    const Comp = components[page.id];
    return <Route exact path={page.path} key={page.id} component={Comp} />;
  }

  render() {
    const { pages } = this.props;
    return (
      <Layout className={styles.layout}>
        <Header paths={paths} match={this.props.match} />
        <Content style={{ background: "#fff", padding: "0 50px" }}>
          <Switch>
            {pages.list.map(Container.renderPage, this)}
            <Redirect to={`/${Pages.PAGE_REG_INFO}`} />
          </Switch>
        </Content>

        <footer>
          <div>
            <b>Contact us: zav@elmetro.ru</b> <br />
            Some inspiring conclusion here
          </div>
        </footer>
      </Layout>
    );
  }
}

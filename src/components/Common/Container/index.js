import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { Header } from "../../Header/index";

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

export default class Container extends Component {
  render() {
    return (
      <Layout className={styles.layout}>
        <Header paths={paths} />
        <Content style={{ background: "#fff", padding: "0 50px" }}>
          {this.props.children}
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
  renderOld() {
    return (
      <div className="app-container">
        <nav className="navbar sticky-top navbar-expand-sm navbar-dark bg-dark">
          <div className="container">
            <a className="navbar-brand text-light" href="/">
              <img
                src="images/si_logo.jpg"
                id="logo"
                className="d-inline-block align-middle"
                alt=""
              />
              StudyIntonation
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbar7"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="navbar-collapse collapse justify-content-stretch"
              id="navbar7"
            >
              <ul className="navbar-nav nav-fill">
                <li className="nav-item">
                  <Link to="/courses">
                    <a className="nav-link">Courses</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/lessons">
                    <a className="nav-link">Lessons</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/tasks">
                    <a className="nav-link">Tasks</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {this.props.children}

        <footer>
          <div>
            <b>Contact us: bogach@gmail.com</b> <br />
            We can help you to train your intonation skills
          </div>
        </footer>
      </div>
    );
  }
}

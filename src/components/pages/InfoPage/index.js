// @flow
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { ButtonAntd } from "../../Common/ButtonAntd";
@inject("history")
@observer
export class InfoPage extends Component {
  render() {
    return (
      <div>
        Info Page
        <ButtonAntd style={{ margin: "20px 10px" }}>Save</ButtonAntd>
      </div>
    );
  }
}

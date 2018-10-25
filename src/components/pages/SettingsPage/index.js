import React from "react";
import { observer, inject } from "mobx-react";
import Slider, { createSliderWithTooltip } from "rc-slider";
import "rc-slider/assets/index.css";

const style = { width: 600, margin: 50 };

@inject("regStore")
@observer
export class SettingsPage extends React.Component {
  handleFontSize = value => {
    const {
      regStore: { regSettings }
    } = this.props;
    console.log(value);
    //regSettings.setFontSize(value);
  };
  renderSliders = () => {
    const {
      regStore: { regSettings }
    } = this.props;
    return <Slider step={20} defaultValue={50} onBeforeChange={() => {}} />;
  };
  render() {
    return (
      <div style={style}>
        Settings page
        {this.renderSliders()}
      </div>
    );
  }
}

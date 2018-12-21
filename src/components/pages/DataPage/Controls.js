// @flow
import React from "react";
import cn from "classnames";
import { PlayButton } from "./Icons/PlayButton";
import { StopButton } from "./Icons/StopButton";

import * as styles from "./controls.less";

type Props = {
  onPlay: () => void,
  onStop: () => void,
  className?: string
};

const controlButtons = {
  play: "play_button",
  stop: "stop_button"
};

export class Controls extends React.Component<Props> {
  state = {
    activeButton: controlButtons.play
  };

  handlePlayButton = () => {
    this.setState({ activeButton: controlButtons.play });
    this.props.onPlay();
  };

  handleStopButton = () => {
    this.setState({ activeButton: controlButtons.stop });
    this.props.onStop();
  };

  render() {
    const { activeButton } = this.state;
    const { onPlay, onStop, className } = this.props;
    const playButtonClass = cn(
      "playButton",
      activeButton === controlButtons.play && "activeButton"
    );
    const stopButtonClass = cn(
      "stopButton",
      activeButton === controlButtons.stop && "activeButton"
    );

    const wrapperClassName = cn(styles.controls, className);
    return (
      <div className={wrapperClassName}>
        <button
          className={playButtonClass}
          onClick={this.handlePlayButton}
          disabled={activeButton === controlButtons.play}
        >
          <PlayButton />
        </button>
        <button
          className={stopButtonClass}
          onClick={this.handleStopButton}
          disabled={activeButton === controlButtons.stop}
        >
          <StopButton />
        </button>
      </div>
    );
  }
}

// @flow
import React from "react";
import { inject, observer } from "mobx-react";

type Props = {
  model: *
};

@inject("enumStore")
@observer
export class AllData extends React.Component<Props> {
  render() {
    return <div>All Data</div>;
  }
}

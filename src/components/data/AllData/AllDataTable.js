// @flow
import React from "react";
import { observer, inject } from "mobx-react";

type Props = {
  model: *
};

@inject("enumStore")
@observer
export class AllDataTable extends React.Component<Props> {
  render() {
    return <div>All-data Table</div>;
  }
}

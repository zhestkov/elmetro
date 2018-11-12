// @flow
import React from "react";
import { observer, inject } from "mobx-react";
import { DataPageTableModel } from "../../../../models/tables/DataPageTableModel";

type Props = {
  model: DataPageTableModel,
  dataStore?: *,
  regStore?: *
};

@inject("dataStore", "regStore")
@observer
export class GraphicsTab extends React.Component<Props> {
  componentDidMount() {
    this.nodeRefs = this.props.model.columns.map(col => col.id || col.field);
  }

  render() {
    const { model } = this.props;
    return (
      <div>
        <p>TODO: GraphicsTab for Page-{`${model.pageNumber}`}</p>
      </div>
    );
  }
}

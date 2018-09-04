// @flow
import React, { Component } from "react";
import { observer } from "mobx-react";

type Props = {
  model: *,
  columns: *,
  onTrClick?: (e: *, data: *) => void
};

@observer
export default class Table extends Component<Props> {

}
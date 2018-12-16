// @flow
import React from "react";

import * as styles from "./DisplayTableCell.less";

type CellObjectType = {
  low: string,
  high: string,
  signal: string,
  description: string,
  units: string,
  value: number
};

export const DisplayTableCell = ({ cell }) => {
  if (typeof cell === "string") {
    return <div className={styles.displayCellWrapper}>{cell}</div>;
  }
  const { low, high, signal, description, units, value } = cell;
  return (
    <div className={styles.displayCellWrapper}>
      <span>{signal}</span>
      <span className={styles.cellValue}>{value}</span>
      {low != null &&
        high != null && <span>{`${low} - ${high} ${units}`}</span>}
      <span>{description}</span>
    </div>
  );
};

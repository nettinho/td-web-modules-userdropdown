import _ from "lodash/fp";
import React from "react";

export const LineageDefs = () => (
  <defs>
    <marker
      id="end"
      viewBox="0 -5 10 10"
      refX="10"
      refY="0"
      markerWidth="6"
      markerHeight="6"
      orient="auto"
    >
      <path d="M0,-5L10,0L0,5L0,-5" fill="#666" />
    </marker>
    <marker
      id="end-active"
      viewBox="0 -5 10 10"
      refX="10"
      refY="0"
      markerWidth="6"
      markerHeight="6"
      orient="auto"
    >
      <path d="M0,-5L10,0L0,5L0,-5" fill="orangered" />
    </marker>
  </defs>
);
export default LineageDefs;

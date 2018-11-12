import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Table } from "semantic-ui-react";
import { linkTo } from "../routes";

export const StructureRow = ({
  id,
  ou,
  group,
  name,
  description,
  system,
  history
}) => (
  <Table.Row
    key={id}
    className="selectable_row"
    onClick={() => {
      history.push(linkTo.STRUCTURE({ id }));
    }}
  >
    <Table.Cell content={name} />
    <Table.Cell content={ou} />
    <Table.Cell content={system} />
    <Table.Cell content={group} />
    <Table.Cell content={_.truncate({ length: 60 })(description)} />
  </Table.Row>
);

StructureRow.propTypes = {
  id: PropTypes.number,
  ou: PropTypes.string,
  group: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  system: PropTypes.string,
  history: PropTypes.object
};

export default withRouter(StructureRow);

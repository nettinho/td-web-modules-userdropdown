import React from "react";
import PropTypes from "prop-types";
import { Table } from "semantic-ui-react";

const FieldValue = ({ field, value }, i) => (
  <Table.Row key={i}>
    <Table.Cell width={5}>
      <strong>{field}</strong>
    </Table.Cell>
    <Table.Cell>{value}</Table.Cell>
  </Table.Row>
);

FieldValue.propTypes = {
  field: PropTypes.string,
  value: PropTypes.string
};

export const FieldGroupTable = ([groupName, fieldValues], i) => (
  <Table key={i} definition unstackable>
    {groupName &&
      groupName !== "undefined" && (
        <Table.Header fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan={2}>{groupName}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      )}
    <Table.Body>{fieldValues.map(FieldValue)}</Table.Body>
  </Table>
);

export default FieldGroupTable;

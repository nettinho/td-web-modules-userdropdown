import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Table } from "semantic-ui-react";
import { linkTo } from "../routes";

export const retrieveIconNameForField = field =>
  field > 0 ? "check circle" : "x";

const getFieldElement = ({ fields, column }) => {
  let field = fields[column.name];
  if (column.fieldSelector) field = column.fieldSelector(fields);
  if (column.fieldDecorator) field = column.fieldDecorator(field);
  return field;
};

export const ConceptRow = ({ fields, columns, history }) => {
  const { id } = fields;
  return (
    <Table.Row
      key={id}
      className="selectable_row"
      onClick={() => history.push(linkTo.CONCEPT({ id }))}
    >
      {columns &&
        columns.map((column, key) => {
          return (
            <Table.Cell
              key={key}
              content={getFieldElement({ fields, column })}
            />
          );
        })}
    </Table.Row>
  );
};

ConceptRow.propTypes = {
  fields: PropTypes.object,
  columns: PropTypes.array,
  history: PropTypes.object
};

export default withRouter(ConceptRow);

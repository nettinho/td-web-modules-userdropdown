import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Divider } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import StructureFieldRow from "./StructureFieldRow";

const hasLineage = _.any(_.prop("external_id"));
const hasConceptsLink = fields =>
  !_.all(e => _.isEmpty(_.property("bc_related")(e)))(fields);

export const StructureFields = ({ fields, ...rest }) => (
  <React.Fragment>
    <Divider hidden />
    <Table celled striped compact selectable attached="bottom">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            content={<FormattedMessage id="structure.field.name" />}
          />
          <Table.HeaderCell
            content={<FormattedMessage id="structure.field.type" />}
          />
          <Table.HeaderCell
            content={<FormattedMessage id="structure.field.precision" />}
          />
          <Table.HeaderCell
            content={<FormattedMessage id="structure.field.nullable" />}
          />
          <Table.HeaderCell
            content={<FormattedMessage id="structure.field.description" />}
          />
          {hasLineage(fields) && (
            <Table.HeaderCell
              content={<FormattedMessage id="structure.field.external_id" />}
            />
          )}
          {hasConceptsLink(fields) && (
            <Table.HeaderCell
              content={<FormattedMessage id="structure.field.concepts" />}
            />
          )}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {fields.map((f, i) => (
          <StructureFieldRow
            key={i}
            lineageVisible={hasLineage(fields)}
            conceptsLinkVisible={hasConceptsLink(fields)}
            {...f}
            {...rest}
          />
        ))}
      </Table.Body>
    </Table>
  </React.Fragment>
);

StructureFields.propTypes = {
  fields: PropTypes.array
};

const mapStateToProps = ({ structure }) => ({
  data_structure_id: structure.id,
  fields: structure.data_fields
});

export default connect(mapStateToProps)(StructureFields);

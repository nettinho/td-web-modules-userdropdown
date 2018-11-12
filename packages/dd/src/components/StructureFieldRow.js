import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { Table, Button, Icon } from "semantic-ui-react";
import { injectIntl } from "react-intl";
import { linkTo } from "../routes";

export const StructureFieldRow = ({
  id,
  name,
  description,
  type,
  data_structure_id,
  nullable,
  precision,
  history,
  external_id,
  bc_related,
  lineageVisible,
  conceptsLinkVisible,
  intl: { formatMessage }
}) => (
  <Table.Row
    key={id}
    className="selectable_row"
    onClick={() => {
      history.push(
        linkTo.STRUCTURE_FIELD({ structure_id: data_structure_id, id })
      );
    }}
  >
    <Table.Cell content={name} />
    <Table.Cell content={type} />
    <Table.Cell content={precision} />
    <Table.Cell
      content={
        nullable
          ? formatMessage({ id: "structure.field.nullable.true" })
          : formatMessage({ id: "structure.field.nullable.false" })
      }
    />
    <Table.Cell content={description} />
    {lineageVisible && (
      <Table.Cell>
        {external_id && (
          <Button
            animated
            onClick={e => {
              e.stopPropagation();
              history.push(linkTo.LINEAGE({ external_id }));
            }}
          >
            <Button.Content hidden>GO!</Button.Content>
            <Button.Content visible>
              <Icon name="share alternate" />
            </Button.Content>
          </Button>
        )}
      </Table.Cell>
    )}
    {conceptsLinkVisible && (
      <Table.Cell>
        {bc_related.map((resource, i) => (
          <Button
            key={i}
            size="tiny"
            onClick={e => {
              e.stopPropagation();
              history.push(
                linkTo.CONCEPT({ id: resource.business_concept_version_id })
              );
            }}
          >
            {resource.resource_name}
          </Button>
        ))}
      </Table.Cell>
    )}
  </Table.Row>
);

StructureFieldRow.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  data_structure_id: PropTypes.number,
  nullable: PropTypes.bool,
  precision: PropTypes.string,
  history: PropTypes.object,
  intl: PropTypes.object,
  external_id: PropTypes.string,
  bc_related: PropTypes.array,
  lineageVisible: PropTypes.bool,
  conceptsLinkVisible: PropTypes.bool
};

export default compose(
  withRouter,
  injectIntl
)(StructureFieldRow);

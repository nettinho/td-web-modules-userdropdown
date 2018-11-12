import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Table, Icon } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { ConfirmModal } from "@truedat/core/components";
import { linkTo } from "@truedat/dd/routes";
import { deleteConceptLink } from "../routines";

const goToStructure = ({ history, structure_id }) => {
  if (structure_id) {
    history.push(linkTo.STRUCTURE({ id: structure_id }));
  }
};

export const ConceptLinkRow = ({
  resource_id,
  resource_type,
  id,
  canDeleteConceptLink,
  deleteConceptLink,
  field: { structure_id, system, group, structure, field, ou },
  history
}) => (
  <Table.Row
    onClick={() => goToStructure({ history, structure_id })}
    className="selectable_row"
  >
    <Table.Cell content={ou} />
    <Table.Cell content={system} />
    <Table.Cell content={group} />
    <Table.Cell content={structure} />
    <Table.Cell content={field} />
    <Table.Cell textAlign="center">
      {canDeleteConceptLink && (
        <ConfirmModal
          icon="trash"
          trigger={<Icon name="trash alternate outline" />}
          header={
            <FormattedMessage id="conceptLink.actions.delete.confirmation.header" />
          }
          content={
            <FormattedMessage id="conceptLink.actions.delete.confirmation.content" />
          }
          handleSubmit={e => {
            deleteConceptLink({ resource_id, resource_type, id });
          }}
          onOpen={e => e.stopPropagation()}
          onClose={e => e.stopPropagation()}
        />
      )}
    </Table.Cell>
  </Table.Row>
);

ConceptLinkRow.propTypes = {
  resource_id: PropTypes.string,
  resource_type: PropTypes.string,
  id: PropTypes.number,
  field: PropTypes.object,
  history: PropTypes.object,
  canDeleteConceptLink: PropTypes.bool,
  deleteConceptLink: PropTypes.func.isRequired
};

const mapStateToProps = ({ concept, conceptLinksActions }) => ({
  canDeleteConceptLink:
    !_.isEmpty(conceptLinksActions) && _.has("add_link")(conceptLinksActions)
      ? true
      : false,
  concept_id: concept.id
});
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ deleteConceptLink }, dispatch)
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConceptLinkRow);

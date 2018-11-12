import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { Table, Header, Icon } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

import routes from "../routes";
import { getConceptsRows, getConceptColumns } from "../selectors";
import ConceptRow from "./ConceptRow";

export const ConceptsTable = ({
  concepts,
  columns,
  conceptsLoading,
  location
}) => {
  const conceptColumns = columns.filter(
    column =>
      (location.pathname == routes.CONCEPTS && column.name != "status") ||
      location.pathname == routes.CONCEPTS_PENDING
  );
  return (
    <React.Fragment>
      {!_.isEmpty(concepts) && (
        <Table celled striped compact selectable>
          <Table.Header>
            <Table.Row>
              {conceptColumns &&
                conceptColumns.map((column, key) => (
                  <Table.HeaderCell
                    key={key}
                    content={
                      <FormattedMessage
                        id={`concepts.props.${column.header || column.name}`}
                      />
                    }
                  />
                ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {concepts.map((s, i) => (
              <ConceptRow key={i} fields={s} columns={conceptColumns} />
            ))}
          </Table.Body>
        </Table>
      )}
      {_.isEmpty(concepts) &&
        !conceptsLoading && (
          <Header as="h4">
            <Icon name="search" />
            <Header.Content>
              <FormattedMessage id="concepts.search.results.empty" />
            </Header.Content>
          </Header>
        )}
    </React.Fragment>
  );
};

ConceptsTable.propTypes = {
  conceptsLoading: PropTypes.bool,
  concepts: PropTypes.array,
  columns: PropTypes.array,
  location: PropTypes.object
};

const mapStateToProps = state => ({
  columns: getConceptColumns(state),
  concepts: getConceptsRows(state),
  conceptsLoading: state.conceptsLoading
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ConceptsTable);

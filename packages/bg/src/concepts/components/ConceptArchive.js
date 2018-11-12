import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Grid, Table } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import ConceptArchiveRow from "./ConceptArchiveRow";

export const ConceptArchive = ({ conceptArchive }) => (
  <Segment attached="bottom">
    <Grid>
      <Grid.Row>
        <Grid.Column>
          {!_.isEmpty(conceptArchive) && (
            <Table celled striped compact selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    content={<FormattedMessage id="concepts.props.status" />}
                  />
                  <Table.HeaderCell
                    content={<FormattedMessage id="concepts.props.version" />}
                  />
                  <Table.HeaderCell
                    content={
                      <FormattedMessage id="concepts.props.last_change_by" />
                    }
                  />
                  <Table.HeaderCell
                    content={
                      <FormattedMessage id="concepts.props.last_change_at" />
                    }
                  />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {conceptArchive.map((item, i) => (
                  <ConceptArchiveRow key={i} {...item} />
                ))}
              </Table.Body>
            </Table>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

ConceptArchive.propTypes = {
  conceptArchive: PropTypes.array
};

const mapStateToProps = ({ conceptArchive }) => ({
  conceptArchive
});

export default connect(mapStateToProps)(ConceptArchive);

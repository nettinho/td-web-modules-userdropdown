import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Segment, Grid, Table } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import ConceptLinkRow from "./ConceptLinkRow";
import ConceptLinkActions from "./ConceptLinkActions";

export const ConceptLinks = ({ conceptLinks, conceptLinksLoading }) => (
  <Segment attached="bottom">
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <ConceptLinkActions />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          {!_.isEmpty(conceptLinks) && (
            <Table celled striped compact selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell
                    content={<FormattedMessage id="conceptLink.ou" />}
                  />
                  <Table.HeaderCell
                    content={<FormattedMessage id="conceptLink.system" />}
                  />
                  <Table.HeaderCell
                    content={<FormattedMessage id="conceptLink.group" />}
                  />
                  <Table.HeaderCell
                    content={<FormattedMessage id="conceptLink.structure" />}
                  />
                  <Table.HeaderCell
                    content={<FormattedMessage id="conceptLink.field" />}
                  />
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {conceptLinks.map((link, i) => (
                  <ConceptLinkRow key={i} {...link} />
                ))}
              </Table.Body>
            </Table>
          )}
          {_.isEmpty(conceptLinks) &&
            !conceptLinksLoading && (
              <FormattedMessage id="conceptLinks.empty" />
            )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

ConceptLinks.propTypes = {
  conceptLinksLoading: PropTypes.bool,
  conceptLinks: PropTypes.array
};

const mapStateToProps = ({ conceptLinks }) => ({
  conceptLinks
});

export default connect(mapStateToProps)(ConceptLinks);

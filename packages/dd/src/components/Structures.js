import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Icon, Table, Segment } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import StructuresPagination from "./StructuresPagination";
import StructureRow from "./StructureRow";
import StructuresSearch from "./StructuresSearch";
import StructureSelectedFilters from "./StructureSelectedFilters";
import StructuresLabelResults from "./StructuresLabelResults";

export const StructuresHeader = () => (
  <Header as="h2">
    <Icon circular name="list" />
    <Header.Content>
      <FormattedMessage id="structures.header" />
      <Header.Subheader>
        <FormattedMessage id="structures.subheader" />
      </Header.Subheader>
    </Header.Content>
  </Header>
);

export const Structures = ({ structures }) => (
  <React.Fragment>
    <Segment>
      <StructuresHeader />
      <StructuresSearch />
      <StructureSelectedFilters />
      <StructuresLabelResults />
      <Table celled striped compact selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              content={<FormattedMessage id="structure.name" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="structure.ou" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="structure.system" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="structure.group" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="structure.description" />}
            />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {structures.map(
            (s, i) => !_.isNil(s.ou) && <StructureRow key={i} {...s} />
          )}
        </Table.Body>
      </Table>
      <StructuresPagination />
    </Segment>
  </React.Fragment>
);

Structures.propTypes = {
  structures: PropTypes.array
};

const mapStateToProps = ({ structures }) => ({
  structures
});

export default connect(mapStateToProps)(Structures);

import React from "react";
import { Header, Icon, Segment } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import ConceptsActions from "./ConceptsActions";
import ConceptCrumbs from "./ConceptCrumbs";
import ConceptsLabelResults from "./ConceptsLabelResults";
import ConceptsPagination from "./ConceptsPagination";
import ConceptsSearch from "./ConceptsSearch";
import ConceptsTable from "./ConceptsTable";
import ConceptsTabs from "./ConceptsTabs";
import ConceptSelectedFilters from "./ConceptSelectedFilters";

export const Concepts = () => (
  <React.Fragment>
    <ConceptCrumbs />
    <Segment>
      <Header as="h2">
        <Icon circular name="tags" />
        <Header.Content>
          <FormattedMessage id="concepts.header" />
          <Header.Subheader>
            <FormattedMessage id="concepts.subheader" />
          </Header.Subheader>
        </Header.Content>
      </Header>
      <Segment attached="bottom">
        <ConceptsTabs />
        <ConceptsActions />
        <ConceptsSearch />
        <ConceptSelectedFilters />
        <ConceptsLabelResults />
        <ConceptsTable />
        <ConceptsPagination />
      </Segment>
    </Segment>
  </React.Fragment>
);

export default Concepts;

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Icon, Table, Segment } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import EngineRow from "./EngineRow";
import EnginesActions from "./EnginesActions";

export const EnginesHeader = () => (
  <Header as="h2">
    <Icon circular name="upload" />
    <Header.Content>
      <FormattedMessage id="engines.header" />
      <Header.Subheader>
        <FormattedMessage id="engines.subheader" />
      </Header.Subheader>
    </Header.Content>
  </Header>
);

export const Engines = ({ engines }) => (
  <React.Fragment>
    <Segment>
      <EnginesHeader />
      <EnginesActions />
      <Table celled striped compact selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              content={<FormattedMessage id="intake.engine.datalake" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="intake.engine.bucket" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="intake.engine.system" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="intake.engine.source" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="intake.engine.host" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="intake.engine.port" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="intake.engine.status" />}
            />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {engines.map((s, i) => <EngineRow key={i} {...s} />)}
        </Table.Body>
      </Table>
    </Segment>
  </React.Fragment>
);

Engines.propTypes = {
  engines: PropTypes.array
};

const mapStateToProps = ({ engines }) => ({
  engines
});

export default connect(mapStateToProps)(Engines);

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Header, Icon, Table, Segment } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import RuleRow from "./RuleRow";
import RulesActions from "./RulesActions";

export const QualityHeader = () => (
  <Header as="h2">
    <Icon circular name="check" />
    <Header.Content>
      <FormattedMessage id="quality.header" />
      <Header.Subheader>
        <FormattedMessage id="quality.subheader" />
      </Header.Subheader>
    </Header.Content>
  </Header>
);

export const Rules = ({ rules }) => (
  <React.Fragment>
    <Segment>
      <QualityHeader />
      <RulesActions />
      <Table celled striped compact selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              content={<FormattedMessage id="quality.business_concept" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="quality.name" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="quality.description" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="quality.goal" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="quality.minimum" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="quality.principle" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="quality.type" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="quality.type_params" />}
            />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {rules.map((s, i) => <RuleRow key={i} {...s} />)}
        </Table.Body>
      </Table>
    </Segment>
  </React.Fragment>
);

Rules.propTypes = {
  rules: PropTypes.array
};

const mapStateToProps = ({ rules }) => ({
  rules
});

export default connect(mapStateToProps)(Rules);

import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { Table, Button, Container } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { compose } from "redux";
import { linkTo } from "../routes";

const ConceptRuleRow = ({ active, name, id }, history) => (
  <Table.Row
    key={id}
    onClick={() => history.push(linkTo.RULE({ id }))}
    className="selectable_row"
  >
    <Table.Cell content={name} />
    <Table.Cell
      content={<FormattedMessage id={`rule.props.active.${active}`} />}
    />
  </Table.Row>
);

ConceptRuleRow.propTypes = {
  name: PropTypes.string,
  active: PropTypes.bool,
  id: PropTypes.number
};

export const ConceptRules = ({ conceptRules, history, createRuleUrl }) => (
  <React.Fragment>
    <Container fluid>
      {createRuleUrl && (
        <Button
          style={{ float: "right", marginTop: "10px", marginBottom: "10px" }}
          secondary
          as={Link}
          to={createRuleUrl}
          content={<FormattedMessage id="concepts.rule.create" />}
        />
      )}
      <Table attached="bottom" style={{ marginTop: "10px" }} celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              content={<FormattedMessage id="concepts.rules.name" />}
            />
            <Table.HeaderCell
              content={<FormattedMessage id="concepts.rules.status" />}
            />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.flow(
            _.filter(e => _.isNil(_.get("deleted_at")(e))),
            _.map(rule => ConceptRuleRow(rule, history))
          )(conceptRules)}
        </Table.Body>
      </Table>
    </Container>
  </React.Fragment>
);

ConceptRules.propTypes = {
  conceptRules: PropTypes.array,
  history: PropTypes.object,
  createRuleUrl: PropTypes.string
};

const mapStateToProps = ({ conceptRules, concept, conceptRulesActions }) => ({
  conceptRules,
  concept,
  createRuleUrl:
    !_.isEmpty(conceptRulesActions) &&
    _.has("create")(conceptRulesActions) &&
    _.has("id")(concept)
      ? linkTo.RULE_CONCEPT_NEW(concept)
      : undefined
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ConceptRules);

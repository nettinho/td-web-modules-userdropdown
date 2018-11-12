import _ from "lodash/fp";
import React from "react";
import { compose } from "redux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Table, Label, Icon } from "semantic-ui-react";
import { injectIntl, FormattedMessage } from "react-intl";

export const RuleImplementationRow = ({
  id,
  implementation_key,
  description,
  system,
  rule,
  system_params,
  rule_results,
  minimum,
  goal,
  intl: { formatMessage }
}) => {
  const result = _.isEmpty(rule_results) ? null : rule_results[0].result;
  const date = _.isEmpty(rule_results) ? null : rule_results[0].date;
  const resultTitle = !_.isNil(result)
    ? formatMessage(
        { id: "quality.rule.quality.description" },
        { result: result, date: date }
      )
    : formatMessage({ id: "quality.rule.quality.no.data" });
  return (
    <Table.Row key={id}>
      <Table.Cell content={implementation_key} />
      <Table.Cell content={_.truncate({ length: 60 })(description)} />
      <Table.Cell content={system} />
      <Table.Cell
        content={formatMessage({ id: `rule.type.${rule.rule_type.name}` })}
      />
      <Table.Cell
        content={Object.keys(system_params).map(function(key) {
          const value = system_params[key];
          return (
            <Label key={key}>
              {key}:{value}
            </Label>
          );
        })}
      />
      <Table.Cell>
        {_.isNil(result) ? (
          <Icon name="circle" title={resultTitle} color="grey" />
        ) : (
          <Icon name="circle" size="mini" color="grey" />
        )}
        {!_.isNil(result) && result < minimum ? (
          <Icon title={resultTitle} name="circle" color="red" />
        ) : (
          <Icon name="circle" size="mini" color="red" />
        )}
        {!_.isNil(result) && minimum <= result && result < goal ? (
          <Icon title={resultTitle} name="circle" color="yellow" />
        ) : (
          <Icon name="circle" size="mini" color="yellow" />
        )}
        {!_.isNil(result) && result >= goal ? (
          <Icon name="circle" title={resultTitle} color="green" />
        ) : (
          <Icon name="circle" size="mini" color="green" />
        )}
      </Table.Cell>
    </Table.Row>
  );
};

RuleImplementationRow.propTypes = {
  id: PropTypes.number,
  implementation_key: PropTypes.string,
  description: PropTypes.string,
  system: PropTypes.string,
  rule: PropTypes.object,
  system_params: PropTypes.object,
  intl: PropTypes.object,
  rule_results: PropTypes.array,
  minimum: PropTypes.number,
  goal: PropTypes.number
};

export const RuleImplementations = ({ rule, ruleImplementations, ...rest }) => {
  const { minimum, goal } = rule;
  return (
    <React.Fragment>
      {!_.isEmpty(rule) &&
        !_.isEmpty(ruleImplementations) && (
          <Table celled striped compact selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  content={
                    <FormattedMessage id="ruleImplementation.props.name" />
                  }
                />
                <Table.HeaderCell
                  content={<FormattedMessage id="quality.rule.description" />}
                />
                <Table.HeaderCell
                  content={<FormattedMessage id="quality.rule.system" />}
                />
                <Table.HeaderCell
                  content={<FormattedMessage id="quality.rule.type" />}
                />
                <Table.HeaderCell
                  content={<FormattedMessage id="quality.rule.system_params" />}
                />
                <Table.HeaderCell
                  content={<FormattedMessage id="quality.rule.quality" />}
                />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {ruleImplementations.map((s, i) => (
                <RuleImplementationRow
                  key={i}
                  {...{ ...s, minimum, goal }}
                  {...rest}
                />
              ))}
            </Table.Body>
          </Table>
        )}
    </React.Fragment>
  );
};

RuleImplementations.propTypes = {
  ruleImplementations: PropTypes.array,
  rule: PropTypes.object
};

const mapStateToProps = ({ rule, ruleImplementations }) => ({
  rule,
  ruleImplementations
});

export default compose(
  injectIntl,
  connect(mapStateToProps)
)(RuleImplementations);

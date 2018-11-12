import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { List, Icon } from "semantic-ui-react";
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { FormattedMessage } from "react-intl";
import { Range } from "rc-slider";
import { getRuleResults, getLastExecution } from "../selectors";
import "rc-slider/assets/index.css";

export const RuleRange = ({
  intl: { formatMessage },
  goal,
  minimum,
  rule_results,
  last_execution
}) => {
  const calculateAverage = () => _.toInteger(_.mean(rule_results));

  const selectColor = () => {
    if (calculateAverage() < minimum) {
      return "red";
    } else if (calculateAverage() < goal) {
      return "yellow";
    } else {
      return "green";
    }
  };
  const resultTitle = !_.isEmpty(rule_results)
    ? last_execution
    : formatMessage({ id: "quality.rule.quality.no.data" });

  const trackStyle = [
    {
      backgroundColor: "#D95C5C"
    },
    {
      backgroundColor: "#feca03"
    },
    {
      backgroundColor: "#78be20"
    }
  ];

  const defaultValue = [0, minimum, goal, 100];

  const marks = {
    [minimum]: `${formatMessage({ id: "quality.threshold" })}`,
    [goal]: {
      label:
        minimum != goal
          ? `${formatMessage({ id: "quality.goal" })}`
          : `${formatMessage({ id: "quality.threshold" })} - ${formatMessage({
              id: "quality.goal"
            })}`,
      style: {
        paddingTop: goal - minimum < 10 ? "15px" : "0px"
      }
    },
    [calculateAverage()]: {
      label: _.isEmpty(rule_results)
        ? ""
        : calculateAverage() == minimum
          ? `${formatMessage({ id: "quality.threshold" })} - ${formatMessage({
              id: "quality.current"
            })}`
          : calculateAverage() == goal
            ? `${formatMessage({ id: "quality.goal" })} - ${formatMessage({
                id: "quality.current"
              })}`
            : `${formatMessage({ id: "quality.current" })}`,
      style: { bottom: "15px" }
    },
    0: {
      label: _.isEmpty(rule_results)
        ? "0 %"
        : calculateAverage() == 0
          ? `0 % - ${formatMessage({ id: "quality.current" })}`
          : "0 %",
      style: { bottom: minimum < 10 ? "22px" : "" }
    },
    100: {
      label:
        calculateAverage() == 100
          ? `100 % - ${formatMessage({ id: "quality.current" })}`
          : "100 %",
      style: { bottom: goal > 90 ? "22px" : "" }
    }
  };

  const handleStyle = [
    {
      borderColor: "#D95C5C",
      backgroundColor: "#D95C5C",
      cursor: "asdasd"
    },
    {
      borderColor: "#feca03",
      backgroundColor: "#feca03",
      cursor: "default"
    },
    {
      borderColor: "#78be20",
      backgroundColor: "#78be20",
      cursor: "default"
    },
    {
      borderColor: "#78be20",
      backgroundColor: "#78be20",
      cursor: "default"
    }
  ];

  return (
    <List.Item>
      <List.Header>
        <FormattedMessage id="quality.range" />
      </List.Header>
      <List.Description>
        <Range
          trackStyle={trackStyle}
          defaultValue={defaultValue}
          railStyle={{ boxShadow: "0px 1px 3px lightgrey" }}
          marks={marks}
          handleStyle={handleStyle}
          style={{
            maxWidth: "600px",
            margin: "25px",
            backgroundColor: "#ffffff00"
          }}
          disabled
        />
        <List>
          <List.Item>
            <Icon name="circle" color="yellow" />
            <List.Content>
              <List.Description>{`${formatMessage({
                id: "quality.threshold"
              })}: ${minimum} %`}</List.Description>
            </List.Content>
          </List.Item>
          <List.Item>
            <Icon name="circle" color="green" />
            <List.Content>
              <List.Description>{`${formatMessage({
                id: "quality.goal"
              })}: ${goal} %`}</List.Description>
            </List.Content>
          </List.Item>
          {!_.isEmpty(rule_results) && (
            <List.Item>
              <Icon name="circle" title={resultTitle} color={selectColor()} />
              <List.Content>
                <List.Description>{`${formatMessage({
                  id: "quality.current"
                })}: ${calculateAverage()} %`}</List.Description>
              </List.Content>
            </List.Item>
          )}
        </List>
      </List.Description>
    </List.Item>
  );
};

RuleRange.propTypes = {
  intl: PropTypes.object,
  goal: PropTypes.number,
  minimum: PropTypes.number,
  rule_results: PropTypes.array,
  last_execution: PropTypes.string
};

const mapStateToProps = ({ rule, ruleImplementations }) => ({
  ...rule,
  rule_results: getRuleResults(ruleImplementations),
  last_execution: getLastExecution(ruleImplementations)
});

export default compose(
  injectIntl,
  connect(mapStateToProps)
)(RuleRange);

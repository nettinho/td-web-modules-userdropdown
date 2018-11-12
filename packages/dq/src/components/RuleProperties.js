import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { List, Icon, Label, Header, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { FormattedMessage } from "react-intl";
import "rc-slider/assets/index.css";
import { linkTo } from "../routes";
import { getRuleTags } from "../selectors";
import RuleRange from "./RuleRange";

const getStatusColor = active =>
  ({
    false: "teal",
    true: "olive"
  }[active] || "grey");

export const RuleProperties = ({
  current_business_concept_version,
  description,
  goal,
  minimum,
  rule_type,
  principle,
  type_params,
  active,
  history,
  ruleTags
}) => (
  <List size="big" relaxed>
    <Label color={getStatusColor(active)}>
      <FormattedMessage id={`rule.props.active.${active}`} />
    </Label>
    <Header as="h3">
      <FormattedMessage id="concepts.props.description" />
    </Header>
    {description}
    <RuleRange goal={goal} minimum={minimum} />
    <List.Item>
      <List.Header>
        <FormattedMessage id="quality.business_concept" />
      </List.Header>
      {!_.isNil(current_business_concept_version) && (
        <Button
          size="tiny"
          key={current_business_concept_version.id}
          onClick={() => {
            history.push(
              linkTo.CURRENT_CONCEPT({
                id: current_business_concept_version.id
              })
            );
          }}
        >
          {current_business_concept_version.name}
        </Button>
      )}
    </List.Item>
    <List.Item>
      <List.Header>
        <FormattedMessage id="quality.tags" />
      </List.Header>
      {!_.isEmpty(ruleTags) &&
        ruleTags.map((rt, i) => <Label key={i}>{rt}</Label>)}
    </List.Item>
    <List.Item>
      <List.Header>
        <FormattedMessage id="rule.props.principle" />
      </List.Header>
      <List.Description>{principle.name}</List.Description>
    </List.Item>
    <List.Item>
      <List.Header>
        <FormattedMessage id="quality.type" />
      </List.Header>
      <List.Description>
        <FormattedMessage id={`rule.type.${rule_type.name}`} />
        <List>
          {type_params &&
            Object.keys(type_params).map(key => {
              return (
                <List.Item key={key}>
                  <Icon
                    name={
                      { min_value: "angle right", max_value: "angle left" }[
                        key
                      ] || ""
                    }
                  />
                  <List.Content>
                    <List.Description>
                      <span style={{ fontWeight: "bold" }}>
                        <FormattedMessage id={`rule.${key}`} />
                      </span>: {type_params[key]}
                    </List.Description>
                  </List.Content>
                </List.Item>
              );
            })}
        </List>
      </List.Description>
    </List.Item>
  </List>
);

RuleProperties.propTypes = {
  current_business_concept_version: PropTypes.object,
  description: PropTypes.string,
  goal: PropTypes.number,
  minimum: PropTypes.number,
  type: PropTypes.string,
  principle: PropTypes.object,
  type_params: PropTypes.object,
  status: PropTypes.string,
  history: PropTypes.object,
  tags: PropTypes.array
};

const mapStateToProps = state => ({
  ...state.rule,
  ruleTags: getRuleTags(state)
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(RuleProperties);

import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Table, Label } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { linkTo } from "../routes";

const RuleTypeParams = ({ typeParams }) => (
  <React.Fragment>
    {typeParams &&
      Object.keys(typeParams).map(function(key) {
        const value = typeParams[key];
        return (
          <Label key={key}>
            <FormattedMessage id={`rule.${key}`} />:{value}
          </Label>
        );
      })}
  </React.Fragment>
);

RuleTypeParams.propTypes = {
  typeParams: PropTypes.object
};

export const RuleRow = ({
  id,
  current_business_concept_version,
  name,
  description,
  goal,
  minimum,
  principle,
  rule_type,
  type_params,
  history
}) => (
  <Table.Row
    key={id}
    className="selectable_row"
    onClick={() => {
      history.push(linkTo.RULE({ id }));
    }}
  >
    <Table.Cell content={current_business_concept_version.name} />
    <Table.Cell content={name} />
    <Table.Cell content={_.truncate({ length: 60 })(description)} />
    <Table.Cell content={goal} />
    <Table.Cell content={minimum} />
    <Table.Cell content={principle.name} />
    <Table.Cell
      content={<FormattedMessage id={`rule.type.${rule_type.name}`} />}
    />
    <Table.Cell content={RuleTypeParams({ typeParams: type_params })} />
  </Table.Row>
);

RuleRow.propTypes = {
  id: PropTypes.number,
  current_business_concept_version: PropTypes.object,
  name: PropTypes.string,
  description: PropTypes.string,
  goal: PropTypes.number,
  minimum: PropTypes.number,
  principle: PropTypes.object,
  rule_type: PropTypes.object,
  type_params: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(RuleRow);

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { linkTo } from "../routes";
import ExecuteRuleButton from "./ExecuteRuleButton";

const createRuleUrl = linkTo.RULE_NEW;

export const RulesActions = () => (
  <div style={{ float: "right" }}>
    {/* <Button
      style={{ marginBottom: "10px" }}
      secondary
      as={Link}
      to={createRuleUrl()}
      content={<FormattedMessage id="quality.actions.create" />}
    /> */}
    <ExecuteRuleButton />
  </div>
);

export default RulesActions;

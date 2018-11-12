import _ from "lodash/fp";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { ConfirmModal } from "@truedat/core/components";
import { linkTo } from "../routes";
import { deleteRule } from "../routines";

const createRuleImplementationUrl = linkTo.RULE_IMPLEMENTATION_NEW;

const getCreateRuleUrl = ({ id }) => createRuleImplementationUrl({ id });

const RuleActions = ({ deleteRule, rule: { id, name }, match }) => (
  <div style={{ float: "right" }}>
    <Button
      secondary
      as={Link}
      to={getCreateRuleUrl(match.params, id)}
      content={<FormattedMessage id="quality.rule.actions.create" />}
    />
    <Button
      secondary
      as={Link}
      to={linkTo.RULE_EDIT({ id })}
      content={<FormattedMessage id="quality.actions.edit" />}
    />
    <ConfirmModal
      icon="trash"
      trigger={
        <Button
          secondary
          content={<FormattedMessage id="quality.actions.remove" />}
        />
      }
      header={
        <FormattedMessage id="rules.actions.delete.confirmation.header" />
      }
      size="small"
      content={
        <FormattedMessage
          id="rules.actions.delete.confirmation.content"
          values={{ name: <i>{name}</i> }}
        />
      }
      handleSubmit={() => deleteRule({ id })}
    />
  </div>
);

RuleActions.propTypes = {
  deleteRule: PropTypes.func,
  rule: PropTypes.object.isRequired,
  match: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ deleteRule }, dispatch)
});

const mapStateToProps = ({ rule }) => ({
  rule
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RuleActions);

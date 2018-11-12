import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { ConfirmModal, FormattedMessageFixed } from "@truedat/core/components";
import { conceptAction } from "../routines";
import { linkTo } from "../routes";
import { mapActionProps } from "../constants/mappings";

const ConceptAction = ({ doAction, action, loading, inProgress, ...rest }) => (
  <Button
    onClick={() => doAction({ action, ...rest })}
    content={
      <FormattedMessageFixed
        id={`concepts.actions.${action}`}
        defaultMessage={action}
      />
    }
    loading={loading === rest.href}
    {...mapActionProps[action]}
    disabled={inProgress}
  />
);

ConceptAction.propTypes = {
  action: PropTypes.string,
  method: PropTypes.string,
  href: PropTypes.string,
  doAction: PropTypes.func.isRequired,
  loading: PropTypes.string,
  inProgress: PropTypes.bool
};

export const ConceptActions = ({
  conceptActions,
  conceptAction,
  conceptActionLoading,
  editUrl,
  deleteAction,
  inProgress
}) => (
  <div style={{ float: "right" }}>
    {Object.entries(conceptActions)
      .map(([key, actionProps]) => ({ key, ...actionProps }))
      .map(({ key, ...rest }) => (
        <ConceptAction
          key={key}
          action={key}
          {...rest}
          loading={conceptActionLoading}
          doAction={conceptAction}
          inProgress={inProgress}
        />
      ))}
    {editUrl && (
      <Button
        secondary
        as={Link}
        to={editUrl}
        content={
          <FormattedMessage id="concepts.actions.edit" defaultMessage="edit" />
        }
      />
    )}
    {deleteAction && (
      <ConfirmModal
        icon="trash"
        trigger={
          <Button
            negative
            icon="trash"
            content={<FormattedMessage id="concepts.actions.delete" />}
          />
        }
        header={
          <FormattedMessage id="concepts.actions.delete.confirmation.header" />
        }
        content={
          <FormattedMessage id="concepts.actions.delete.confirmation.content" />
        }
        handleSubmit={() =>
          conceptAction({ action: "delete", ...deleteAction })
        }
      />
    )}
  </div>
);
ConceptActions.propTypes = {
  conceptActions: PropTypes.object,
  conceptAction: PropTypes.func.isRequired,
  conceptActionLoading: PropTypes.string,
  deleteAction: PropTypes.object,
  editUrl: PropTypes.string,
  inProgress: PropTypes.bool
};

const hiddenActions = [
  "create",
  "csv",
  "delete",
  "get_data_fields",
  "get_data_structures",
  "index",
  "search",
  "show",
  "update",
  "versions",
  "upload"
];

const mapDispatchToProps = dipatch => ({
  ...bindActionCreators({ conceptAction }, dipatch)
});

const mapStateToProps = ({
  conceptActions,
  conceptActionLoading,
  concept
}) => ({
  conceptActions: _.omit(hiddenActions)(conceptActions),
  editUrl:
    _.has("update")(conceptActions) && _.has("id")(concept)
      ? linkTo.CONCEPT_EDIT(concept)
      : undefined,
  deleteAction: _.get("delete")(conceptActions),
  conceptActionLoading,
  createRuleUrl: _.has("id")(concept) ? linkTo.RULE_NEW(concept) : undefined,
  inProgress: _.get("in_progress")(concept)
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConceptActions);

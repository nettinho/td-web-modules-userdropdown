import _ from "lodash/fp";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Dropdown, Button, Responsive, Modal, Grid } from "semantic-ui-react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { ConfirmModal } from "@truedat/core/components";

import { deleteDomain } from "../routines";
import { filterDomains } from "../routines";

const DomainAction = ({ action, icon, messageId, id, ...rest }) => (
  <Dropdown.Item
    text={<FormattedMessage id={messageId} />}
    icon={icon}
    as={Link}
    to={action(id)}
    {...rest}
  />
);
DomainAction.propTypes = {
  action: PropTypes.func,
  icon: PropTypes.string,
  messageId: PropTypes.string,
  id: PropTypes.number
};

const DomainActionButton = ({ action, icon, messageId, id, ...rest }) => (
  <Button
    style={{ float: "right" }}
    secondary
    content={<FormattedMessage id={messageId} />}
    icon={icon}
    as={Link}
    to={action(id)}
    {...rest}
  />
);
DomainActionButton.propTypes = {
  action: PropTypes.func,
  icon: PropTypes.string,
  messageId: PropTypes.string,
  id: PropTypes.number
};

const ModalConfirm = ({
  open,
  header,
  subHeader,
  content,
  onCancel,
  onConfirm
}) => (
  <Fragment>
    <Modal open={open} onClose={onCancel} closeIcon size="small">
      {header && (
        <Modal.Header>
          {header}
          {subHeader && <div className="subheader">{subHeader}</div>}
        </Modal.Header>
      )}
      <Modal.Content>{content}</Modal.Content>
      <Modal.Actions>
        <Grid columns="equal">
          <Grid.Column>
            <Button fluid secondary onClick={onCancel}>
              <FormattedMessage id="actions.cancel" />
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button fluid negative onClick={onConfirm}>
              <FormattedMessage id="actions.delete" />
            </Button>
          </Grid.Column>
        </Grid>
      </Modal.Actions>
    </Modal>
  </Fragment>
);

ModalConfirm.propTypes = {
  open: PropTypes.bool,
  content: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  header: PropTypes.string,
  subHeader: PropTypes.string
};

const ActionButtons = ({
  domainActions,
  id,
  availableActions,
  formatMessage,
  handleConfirm
}) => (
  <Fragment>
    {domainActions.delete &&
      availableActions.deleteOption && (
        <ConfirmModal
          style={{ marginTop: "200px", marginLeft: "200px" }}
          header={formatMessage({ id: "domain" })}
          content={formatMessage({ id: "actions.confirm" })}
          handleSubmit={handleConfirm}
          trigger={
            <Button
              style={{ float: "right" }}
              negative
              content={<FormattedMessage id="actions.delete" />}
              icon="trash"
            />
          }
        />
      )}
    {Object.entries(domainActions)
      .map(([key, actionProps]) => ({ key, ...actionProps }))
      .filter(({ key }) => key in availableActions)
      .map(({ key, ...rest }) => (
        <DomainActionButton
          key={key}
          action={availableActions[key]["action"]}
          {...{ ...rest, ...availableActions[key], id }}
        />
      ))}
  </Fragment>
);

ActionButtons.propTypes = {
  domainActions: PropTypes.object,
  id: PropTypes.number,
  availableActions: PropTypes.object,
  formatMessage: PropTypes.func,
  handleConfirm: PropTypes.func
};

const ActionDropdown = ({
  domainActions,
  id,
  formatMessage,
  availableActions,
  handleConfirm
}) => (
  <Fragment>
    <Dropdown
      text={formatMessage({ id: "actions" })}
      style={{ float: "right" }}
    >
      <Dropdown.Menu style={{ right: 0, left: "auto" }}>
        {Object.entries(domainActions)
          .map(([key, actionProps]) => ({ key, ...actionProps }))
          .filter(({ key }) => key in availableActions)
          .map(({ key, ...rest }) => (
            <DomainAction
              key={key}
              action={availableActions[key]["action"]}
              {...{ ...rest, ...availableActions[key], id }}
            />
          ))}
        {domainActions.delete &&
          availableActions.deleteOption && (
            <React.Fragment>
              <Dropdown.Divider />
              <ConfirmModal
                style={{ marginTop: "200px", marginLeft: "200px" }}
                header={formatMessage({ id: "domain" })}
                content={formatMessage({ id: "actions.confirm" })}
                handleSubmit={handleConfirm}
                trigger={
                  <Dropdown.Item
                    text={<FormattedMessage id="actions.delete" />}
                    icon="trash"
                  />
                }
              />
            </React.Fragment>
          )}
      </Dropdown.Menu>
    </Dropdown>
  </Fragment>
);

ActionDropdown.propTypes = {
  domainActions: PropTypes.object,
  id: PropTypes.number,
  formatMessage: PropTypes.func,
  availableActions: PropTypes.object,
  handleConfirm: PropTypes.func
};

export class DomainActions extends React.Component {
  static propTypes = {
    domain: PropTypes.object,
    deleteDomain: PropTypes.func,
    domainActions: PropTypes.object,
    intl: PropTypes.object,
    availableActions: PropTypes.object
  };

  handleConfirm = () => {
    this.setState({ open: false });
    this.props.deleteDomain(this.props.domain);
  };

  render = () => {
    const { domain, domainActions, intl, availableActions } = this.props;
    const { formatMessage } = intl;
    const { id } = domain;
    return _.isEmpty(domainActions) ? null : (
      <React.Fragment>
        <Responsive as={Fragment} maxWidth={1160}>
          <ActionDropdown
            domainActions={domainActions}
            show={this.show}
            id={id}
            formatMessage={formatMessage}
            availableActions={availableActions}
            handleConfirm={this.handleConfirm}
          />
        </Responsive>
        <Responsive as={Fragment} minWidth={1160}>
          <ActionButtons
            domainActions={domainActions}
            show={this.show}
            id={id}
            availableActions={availableActions}
            formatMessage={formatMessage}
            handleConfirm={this.handleConfirm}
          />
        </Responsive>
      </React.Fragment>
    );
  };
}

const hiddenActions = ["show", "index"];

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ deleteDomain }, dispatch),
  handleFilterDomains: event => {
    const query = event.target.value;
    return dispatch(filterDomains({ query }));
  }
});

const mapStateToProps = ({ domain, domainActions }) => ({
  domain,
  domainActions: _.omit(hiddenActions)(domainActions)
});

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DomainActions);

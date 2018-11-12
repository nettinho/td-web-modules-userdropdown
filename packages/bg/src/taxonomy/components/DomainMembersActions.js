import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

const DomainMembersActionButton = ({
  action,
  icon,
  messageId,
  id,
  ...rest
}) => (
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
DomainMembersActionButton.propTypes = {
  action: PropTypes.func,
  icon: PropTypes.string,
  messageId: PropTypes.string,
  id: PropTypes.number
};

export class DomainMembersActions extends React.Component {
  static propTypes = {
    domain: PropTypes.object,
    domainMembersActions: PropTypes.object,
    availableActions: PropTypes.object
  };

  render = () => {
    const { domain, domainMembersActions, availableActions } = this.props;
    const { id } = domain;
    return _.isEmpty(domainMembersActions) ? null : (
      <React.Fragment>
        {Object.entries(domainMembersActions)
          .map(([key, actionProps]) => ({ key, ...actionProps }))
          .filter(({ key }) => key in availableActions)
          .map(({ key, ...rest }) => (
            <DomainMembersActionButton
              key={key}
              action={availableActions[key]["action"]}
              {...{ ...rest, ...availableActions[key], id }}
            />
          ))}
      </React.Fragment>
    );
  };
}

const hiddenActions = [];

const mapStateToProps = ({ domain, domainMembersActions }) => ({
  domain,
  domainMembersActions: _.omit(hiddenActions)(domainMembersActions)
});

export default connect(mapStateToProps)(DomainMembersActions);

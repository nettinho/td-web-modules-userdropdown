import _ from "lodash/fp";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Card, Message, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { injectIntl, FormattedMessage } from "react-intl";
import { Loading } from "@truedat/core/components";
import { linkTo } from "../routes";
import DomainMember from "./DomainMember";
import DomainMembersActions from "./DomainMembersActions";
const toAddMemberPath = linkTo.DOMAIN_MEMBERS_NEW;

export const DomainMembers = ({
  domain,
  domainMembers,
  domainMembersLoading,
  intl: { formatMessage }
}) => {
  const available_actions = {
    create_or_update: {
      order: 3,
      icon: "add user",
      messageId: "domain.actions.add_member",
      action: id => toAddMemberPath({ id })
    }
  };
  return (
    <Fragment>
      {!_.isEmpty(domainMembers) &&
        !domainMembersLoading && (
          <Grid centered columns={1}>
            <Grid.Column>
              <DomainMembersActions availableActions={available_actions} />
            </Grid.Column>
          </Grid>
        )}
      {domainMembersLoading && <Loading inline="centered" />}
      {_.isEmpty(domainMembers) &&
        !domainMembersLoading && (
          <Message
            icon="warning"
            header={formatMessage({ id: "domain.members.empty" })}
            list={[
              <Link key={1} to={linkTo.DOMAIN_MEMBERS_NEW({ id: domain.id })}>
                <FormattedMessage id="domain.actions.add_member" />
              </Link>
            ]}
          />
        )}
      <Card.Group>
        {domainMembers.map((m, i) => <DomainMember key={i} {...m} />)}
      </Card.Group>
    </Fragment>
  );
};

DomainMembers.propTypes = {
  domain: PropTypes.object,
  domainMembers: PropTypes.array,
  domainMembersLoading: PropTypes.bool,
  intl: PropTypes.object
};

const mapStateToProps = ({ domain, domainMembers, domainMembersLoading }) => ({
  domain,
  domainMembers,
  domainMembersLoading
});

export default compose(
  injectIntl,
  connect(mapStateToProps)
)(DomainMembers);

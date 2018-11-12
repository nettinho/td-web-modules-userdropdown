import _ from "lodash/fp";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Header, Icon, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { UserBreadcrumbs } from "./UserBreadcrumbs";
import UserAcls from "./UserAcls";
import UserGroupAcls from "./UserGroupAcls";

export const User = ({ user }) =>
  _.isEmpty(user) ? null : (
    <Fragment>
      <UserBreadcrumbs name={user.user_name} />
      <Segment>
        <Header as="h2">
          <Icon name="user" circular />
          <Header.Content>
            {user.user_name}
            <Header.Subheader>
              {user.is_admin ? (
                <FormattedMessage id="user.type.admin" />
              ) : (
                <FormattedMessage id="user.type.user" />
              )}
            </Header.Subheader>
          </Header.Content>
        </Header>
        {user.full_name}
        <br />
        {user.email}
        <br />
        {_.join(" ")(user.groups)}
        <br />
        <br />
        <br />
        <UserAcls />
        <UserGroupAcls />
      </Segment>
    </Fragment>
  );

User.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(
  mapStateToProps,
  null
)(User);

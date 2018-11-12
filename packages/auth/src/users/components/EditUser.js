import _ from "lodash/fp";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Header, Icon, Container, Segment } from "semantic-ui-react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { required, validEmail, ruleRunner } from "@truedat/core/validation";
import { injectIntl } from "react-intl";
import { updateUser } from "../routines";
import UserForm from "./UserForm";
import { UserBreadcrumbs } from "./UserBreadcrumbs";

const fieldValidations = [
  ruleRunner("user_name", "User name", required),
  ruleRunner("email", "Email", required, validEmail),
  ruleRunner("full_name", "Full Name", required)
];

const EditUser = ({ updateUser, user, intl: { formatMessage } }) =>
  _.isEmpty(user) ? null : (
    <Fragment>
      <UserBreadcrumbs name={formatMessage({ id: "users.actions.edit" })} />
      <Container text as={Segment}>
        <Header as="h2">
          <Icon name="user" />
          <Header.Content>
            <FormattedMessage id="users.actions.edit" />
          </Header.Content>
        </Header>
        <UserForm
          handleSubmit={updateUser}
          user={user}
          fieldValidations={fieldValidations}
          edit
        />
      </Container>
    </Fragment>
  );

EditUser.propTypes = {
  user: PropTypes.object,
  updateUser: PropTypes.func,
  intl: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateUser }, dispatch)
});

const mapStateToProps = ({ user }) => ({ user });

export default compose(
  injectIntl,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EditUser);

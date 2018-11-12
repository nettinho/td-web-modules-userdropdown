import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Header, Icon, Container, Segment } from "semantic-ui-react";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import {
  mustMatch,
  required,
  minLength,
  validEmail,
  ruleRunner
} from "@truedat/core/validation";
import { FormattedMessage, injectIntl } from "react-intl";
import { createUser } from "../routines";
import UserForm from "./UserForm";
import UserBreadcrumbs from "./UserBreadcrumbs";

const fieldValidations = [
  ruleRunner("user_name", "User name", required),
  ruleRunner("email", "Email", required, validEmail),
  ruleRunner("full_name", "Full Name", required),
  ruleRunner("password", "Password", required, minLength(6)),
  ruleRunner(
    "rep_password",
    "Password Confirmation",
    mustMatch("password", "Password")
  )
];

const NewUser = ({ createUser, intl: { formatMessage } }) => (
  <Fragment>
    <UserBreadcrumbs name={formatMessage({ id: "users.actions.create" })} />
    <Container text as={Segment}>
      <Header as="h2">
        <Icon name="user" />
        <Header.Content>
          <FormattedMessage id="users.actions.create" />
        </Header.Content>
      </Header>
      <UserForm handleSubmit={createUser} fieldValidations={fieldValidations} />
    </Container>
  </Fragment>
);

NewUser.propTypes = {
  createUser: PropTypes.func,
  intl: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ createUser }, dispatch)
});

export default compose(
  injectIntl,
  connect(
    null,
    mapDispatchToProps
  )
)(NewUser);

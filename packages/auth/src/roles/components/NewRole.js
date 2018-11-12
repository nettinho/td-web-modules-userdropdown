import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Header, Icon, Container, Segment } from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { required, ruleRunner } from "@truedat/core/validation";
import { createRole } from "../routines";
import RoleForm from "./RoleForm";

const fieldValidations = [ruleRunner("name", "Name", required)];

const NewRole = ({ createRole }) => (
  <Fragment>
    <Container text as={Segment}>
      <Header as="h2">
        <Icon name="student" />
        <Header.Content>New Role</Header.Content>
      </Header>
      <RoleForm handleSubmit={createRole} fieldValidations={fieldValidations} />
    </Container>
  </Fragment>
);

NewRole.propTypes = {
  createRole: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ createRole }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(NewRole);

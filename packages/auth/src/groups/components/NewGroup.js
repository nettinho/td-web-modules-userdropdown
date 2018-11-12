import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Header, Icon, Container, Segment } from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { required, ruleRunner } from "@truedat/core/validation";
import { createGroup } from "../routines";
import GroupForm from "./GroupForm";
import GroupBreadcrumbs from "./GroupBreadcrumbs";

const fieldValidations = [ruleRunner("name", "Name", required)];

const NewGroup = ({ createGroup }) => (
  <Fragment>
    <GroupBreadcrumbs name="groups.actions.create" />
    <Container text as={Segment}>
      <Header as="h2">
        <Icon name="group" />
        <Header.Content>
          <FormattedMessage
            id="groups.actions.create"
            defaultMessage="New group"
          />
        </Header.Content>
      </Header>
      <GroupForm
        handleSubmit={createGroup}
        fieldValidations={fieldValidations}
      />
    </Container>
  </Fragment>
);

NewGroup.propTypes = {
  createGroup: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ createGroup }, dispatch)
});

export default connect(
  null,
  mapDispatchToProps
)(NewGroup);

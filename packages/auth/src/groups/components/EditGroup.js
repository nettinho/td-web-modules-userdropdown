import _ from "lodash/fp";
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Header, Icon, Container, Segment } from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { required, ruleRunner } from "@truedat/core/validation";
import { updateGroup } from "../routines";
import GroupForm from "./GroupForm";
import { GroupBreadcrumbs } from "./GroupBreadcrumbs";

const fieldValidations = [ruleRunner("name", "Name", required)];

const EditGroup = ({ updateGroup, group }) =>
  _.isEmpty(group) ? null : (
    <Fragment>
      <GroupBreadcrumbs name="groups.actions.edit" />
      <Container text as={Segment}>
        <Header as="h2">
          <Icon name="group" />
          <Header.Content>
            <FormattedMessage id="groups.actions.edit" />
          </Header.Content>
        </Header>
        <GroupForm
          handleSubmit={updateGroup}
          group={group}
          fieldValidations={fieldValidations}
          edit
        />
      </Container>
    </Fragment>
  );

EditGroup.propTypes = {
  group: PropTypes.object,
  updateGroup: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateGroup }, dispatch)
});

const mapStateToProps = ({ group }) => ({ group });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGroup);

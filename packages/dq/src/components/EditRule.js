import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Header, Label, Icon, Segment } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { updateRule } from "../routines";
import RuleForm from "./RuleForm";

const non_editable_fields = ["rule_type_id"];

export const EditRule = ({ rule, updateRule }) =>
  !rule.id ? null : (
    <Container as={Segment} text>
      <Header as="h2">
        <Icon name="cube" />
        <Header.Content>
          <FormattedMessage id="quality.actions.edit" />
        </Header.Content>
        <Header.Subheader>
          <FormattedMessage id={`rule.type.${_.get("rule_type.name")(rule)}`} />
        </Header.Subheader>
      </Header>
      <RuleForm
        handleSubmit={updateRule}
        rule={rule}
        non_editable_fields={non_editable_fields}
      />
    </Container>
  );

EditRule.propTypes = {
  rule: PropTypes.object.isRequired,
  updateRule: PropTypes.func.isRequired
};

const mapStateToProps = ({ rule }) => ({ rule });
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ updateRule }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRule);

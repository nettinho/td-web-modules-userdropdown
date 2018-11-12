import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Header, Icon, Segment } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { createRule } from "../routines";
import RuleForm from "./RuleForm";

export const NewRule = ({ rule, createRule }) => (
  <Container as={Segment} text>
    <Header as="h2">
      <Icon name="wrench" />
      <Header.Content>
        {!_.isEmpty(rule) && <FormattedMessage id="rule.actions.create" />}
        {_.isEmpty(rule) && <FormattedMessage id="rules.actions.create" />}
      </Header.Content>
    </Header>
    <RuleForm handleSubmit={createRule} />
  </Container>
);

NewRule.propTypes = {
  rule: PropTypes.object,
  createRule: PropTypes.func.isRequired
};

const mapStateToProps = ({ rule }) => ({ rule });
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ createRule }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRule);

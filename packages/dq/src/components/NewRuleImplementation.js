import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Container, Header, Icon, Segment } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { createRuleImplementation } from "../routines";
import RuleImplementationForm from "./RuleImplementationForm";

export const NewRuleImplementation = ({
  ruleImplementation,
  createRuleImplementation
}) => (
  <Container as={Segment} text>
    <Header as="h2">
      <Icon name="wrench" />
      <Header.Content>
        {!_.isEmpty(ruleImplementation) && (
          <FormattedMessage id="ruleImplementations.actions.create" />
        )}
        {_.isEmpty(ruleImplementation) && (
          <FormattedMessage id="ruleImplementations.actions.create" />
        )}
      </Header.Content>
    </Header>
    <RuleImplementationForm handleSubmit={createRuleImplementation} />
  </Container>
);

NewRuleImplementation.propTypes = {
  ruleImplementation: PropTypes.object,
  createRuleImplementation: PropTypes.func.isRequired
};

const mapStateToProps = ({ ruleImplementation }) => ({ ruleImplementation });
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ createRuleImplementation }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRuleImplementation);

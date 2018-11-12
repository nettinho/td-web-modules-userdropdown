import _ from "lodash/fp";
import React from "react";
import PropTypes from "prop-types";
import { Header, Icon, Segment, Container, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import RuleImplementations from "./RuleImplementations";
import RuleProperties from "./RuleProperties";
import RuleActions from "./RuleActions";

export const Rule = ({ rule, ruleActions }) => {
  return _.isEmpty(rule) ? null : (
    <React.Fragment>
      <Container as={Segment} fluid>
        {!_.isNil(ruleActions) && !_.isEmpty(ruleActions) && <RuleActions />}
        <Header as="h2">
          <Icon circular name="clipboard check" />
          <Header.Content>{rule.name}</Header.Content>
        </Header>
        <Divider hidden />
        <RuleProperties />
        <Header as="h3">
          <FormattedMessage id="rule.props.implementations" />
        </Header>
        <RuleImplementations />
      </Container>
    </React.Fragment>
  );
};

Rule.propTypes = {
  rule: PropTypes.object.isRequired,
  ruleActions: PropTypes.object
};

const mapStateToProps = ({ rule, ruleActions }) => ({
  rule,
  ruleActions
});

export default connect(mapStateToProps)(Rule);

import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";
import { FormattedMessage } from "react-intl";
import { AdminRole } from "@truedat/auth/components";

import { executeRules } from "../routines";

const ExecuteRuleButton = ({ executeRulesLoading, executeRules }) => (
  <Button
    style={{ float: "right", marginBottom: "10px" }}
    secondary
    onClick={() => executeRules()}
    loading={executeRulesLoading}
    content={<FormattedMessage id="concepts.actions.execute" />}
  />
);

ExecuteRuleButton.propTypes = {
  executeRulesLoading: PropTypes.bool,
  executeRules: PropTypes.func
};

const mapStateToProps = ({ executeRulesLoading }) => ({
  executeRulesLoading
});

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ executeRules }, dispatch)
});

export default compose(
  AdminRole,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ExecuteRuleButton);

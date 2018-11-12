import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import {
  clearRuleImplementations,
  fetchRuleImplementations
} from "../routines";

class RuleImplementationsLoader extends React.Component {
  static propTypes = {
    fetchRuleImplementations: PropTypes.func,
    clearRuleImplementations: PropTypes.func,
    match: PropTypes.object,
    ruleImplementationsLoading: PropTypes.bool
  };

  componentDidMount() {
    const { fetchRuleImplementations, match } = this.props;
    const { id } = match.params;
    if (id) {
      fetchRuleImplementations({ id });
    }
  }

  componentWillUnmount() {
    const { clearRuleImplementations } = this.props;
    clearRuleImplementations();
  }

  render() {
    const { ruleImplementationsLoading } = this.props;

    if (ruleImplementationsLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    { clearRuleImplementations, fetchRuleImplementations },
    dispatch
  )
});

const mapStateToProps = ({ ruleImplementationsLoading }) => ({
  ruleImplementationsLoading
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RuleImplementationsLoader);

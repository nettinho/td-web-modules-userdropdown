import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { clearConcepts, fetchConcepts } from "@truedat/bg/routines";
import { clearRule, fetchRule } from "../routines";

class RuleLoader extends React.Component {
  static propTypes = {
    clearConcepts: PropTypes.func,
    fetchConcepts: PropTypes.func,
    fetchRule: PropTypes.func,
    clearRule: PropTypes.func,
    match: PropTypes.object,
    ruleLoading: PropTypes.bool
  };

  componentDidMount() {
    const { fetchRule, fetchConcepts, match } = this.props;
    const { id } = match.params;
    fetchRule({ id });
    fetchConcepts({});
  }

  componentWillUnmount() {
    const { clearRule, clearConcepts } = this.props;
    clearRule();
    clearConcepts();
  }

  render() {
    const { ruleLoading } = this.props;

    if (ruleLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    { clearRule, fetchRule, fetchConcepts, clearConcepts },
    dispatch
  )
});

const mapStateToProps = ({ ruleLoading }) => ({ ruleLoading });

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RuleLoader);

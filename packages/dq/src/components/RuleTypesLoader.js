import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { clearRuleTypes, fetchRuleTypes } from "../routines";

export class RuleTypesLoader extends React.Component {
  static propTypes = {
    fetchRuleTypes: PropTypes.func,
    clearRuleTypes: PropTypes.func,
    ruleTypesLoading: PropTypes.bool
  };

  componentDidMount() {
    const { fetchRuleTypes } = this.props;
    fetchRuleTypes();
  }

  componentWillUnmount() {
    const { clearRuleTypes } = this.props;
    clearRuleTypes();
  }

  render() {
    const { ruleTypesLoading } = this.props;

    if (ruleTypesLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ clearRuleTypes, fetchRuleTypes }, dispatch)
});

const mapStateToProps = ({ ruleTypesLoading }) => ({ ruleTypesLoading });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RuleTypesLoader);

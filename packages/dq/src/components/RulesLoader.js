import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { clearRules, fetchRules } from "../routines";

export class RulesLoader extends React.Component {
  static propTypes = {
    fetchRules: PropTypes.func,
    clearRules: PropTypes.func,
    rulesLoading: PropTypes.bool
  };

  componentDidMount() {
    const { fetchRules } = this.props;
    fetchRules();
  }

  componentWillUnmount() {
    const { clearRules } = this.props;
    clearRules();
  }

  render() {
    const { rulesLoading } = this.props;

    if (rulesLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ clearRules, fetchRules }, dispatch)
});

const mapStateToProps = ({ rulesLoading }) => ({ rulesLoading });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RulesLoader);

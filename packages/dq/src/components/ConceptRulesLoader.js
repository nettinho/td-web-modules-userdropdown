import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { fetchConceptRules, clearConceptRules } from "../routines";

export class ConceptRulesLoader extends React.Component {
  static propTypes = {
    fetchConceptRules: PropTypes.func,
    clearConceptRules: PropTypes.func,
    conceptRulesLoading: PropTypes.bool,
    business_concept_id: PropTypes.number
  };

  componentDidMount() {
    const { fetchConceptRules, business_concept_id } = this.props;

    if (business_concept_id) {
      fetchConceptRules({ business_concept_id });
    }
  }

  componentWillUnmount() {
    const { clearConceptRules } = this.props;
    clearConceptRules();
  }

  render() {
    const { conceptRulesLoading } = this.props;

    if (conceptRulesLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ clearConceptRules, fetchConceptRules }, dispatch)
});

const mapStateToProps = ({ conceptRulesLoading, concept }) => ({
  conceptRulesLoading,
  business_concept_id: concept.business_concept_id
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConceptRulesLoader);

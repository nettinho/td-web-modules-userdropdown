import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { clearConceptFilters, fetchConceptFilters } from "../routines";

export class ConceptFiltersLoader extends React.Component {
  static propTypes = {
    clearConceptFilters: PropTypes.func,
    fetchConceptFilters: PropTypes.func,
    conceptFiltersLoading: PropTypes.bool
  };

  componentDidMount() {
    const { fetchConceptFilters } = this.props;
    fetchConceptFilters();
  }

  componentWillUnmount() {
    const { clearConceptFilters } = this.props;
    clearConceptFilters();
  }

  render() {
    const { conceptFiltersLoading } = this.props;

    if (conceptFiltersLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ clearConceptFilters, fetchConceptFilters }, dispatch)
});

const mapStateToProps = ({ conceptFiltersLoading }) => ({
  conceptFiltersLoading
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConceptFiltersLoader);

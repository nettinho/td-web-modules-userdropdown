import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { clearConcepts, fetchConcepts, updateConceptPath } from "../routines";

class ConceptsLoader extends React.Component {
  static propTypes = {
    fetchConcepts: PropTypes.func,
    clearConcepts: PropTypes.func,
    conceptsLoading: PropTypes.bool,
    match: PropTypes.object,
    updateConceptPath: PropTypes.func
  };

  componentDidMount() {
    const {
      updateConceptPath,
      fetchConcepts,
      match: { path }
    } = this.props;
    updateConceptPath({ path });
    fetchConcepts({});
  }

  componentWillUnmount() {
    const { clearConcepts } = this.props;
    clearConcepts();
  }

  render() {
    const { conceptsLoading } = this.props;

    if (conceptsLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      clearConcepts,
      fetchConcepts,
      updateConceptPath
    },
    dispatch
  )
});

const mapStateToProps = ({ conceptsLoading }) => ({ conceptsLoading });

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConceptsLoader);

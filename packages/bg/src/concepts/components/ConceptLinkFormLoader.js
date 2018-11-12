import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import {
  clearConceptLinkStructures,
  fetchConceptLinkStructures
} from "../routines";

class ConceptLinkFormLoader extends React.Component {
  static propTypes = {
    fetchConceptLinkStructures: PropTypes.func,
    clearConceptLinkStructures: PropTypes.func,
    conceptLinkStructuresLoading: PropTypes.bool,
    match: PropTypes.object
  };

  componentDidMount() {
    const { fetchConceptLinkStructures, match } = this.props;
    const { id } = match.params;
    if (id) {
      fetchConceptLinkStructures({ id });
    }
  }

  componentWillUnmount() {
    const { clearConceptLinkStructures } = this.props;
    clearConceptLinkStructures();
  }

  render() {
    const { conceptLinkStructuresLoading } = this.props;

    if (conceptLinkStructuresLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      clearConceptLinkStructures,
      fetchConceptLinkStructures
    },
    dispatch
  )
});

const mapStateToProps = ({
  conceptLinkStructuresLoading,
  conceptLinkStructures
}) => ({
  conceptLinkStructuresLoading,
  conceptLinkStructures
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConceptLinkFormLoader);

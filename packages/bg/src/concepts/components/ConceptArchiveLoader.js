import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { fetchConceptArchive, clearConceptArchive } from "../routines";

export class ConceptArchiveLoader extends React.Component {
  static propTypes = {
    fetchConceptArchive: PropTypes.func,
    clearConceptArchive: PropTypes.func,
    conceptArchiveLoading: PropTypes.bool,
    match: PropTypes.object
  };

  componentDidMount() {
    const { fetchConceptArchive, match } = this.props;
    const { id } = match.params;
    if (id) {
      fetchConceptArchive({ id });
    }
  }

  componentWillUnmount() {
    const { clearConceptArchive } = this.props;
    clearConceptArchive();
  }

  render() {
    const { conceptArchiveLoading } = this.props;

    if (conceptArchiveLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    {
      clearConceptArchive,
      fetchConceptArchive
    },
    dispatch
  )
});

const mapStateToProps = ({ conceptArchiveLoading }) => ({
  conceptArchiveLoading
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConceptArchiveLoader);

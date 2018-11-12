import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { clearStructureFilters, fetchStructureFilters } from "../routines";

export class StructureFiltersLoader extends React.Component {
  static propTypes = {
    clearStructureFilters: PropTypes.func,
    fetchStructureFilters: PropTypes.func,
    structureFiltersLoading: PropTypes.bool
  };

  componentDidMount() {
    const { fetchStructureFilters } = this.props;
    fetchStructureFilters();
  }

  componentWillUnmount() {
    const { clearStructureFilters } = this.props;
    clearStructureFilters();
  }

  render() {
    const { structureFiltersLoading } = this.props;

    if (structureFiltersLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    { clearStructureFilters, fetchStructureFilters },
    dispatch
  )
});

const mapStateToProps = ({ structureFiltersLoading }) => ({
  structureFiltersLoading
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(StructureFiltersLoader);

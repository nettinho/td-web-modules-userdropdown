import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { fetchDomains, clearStructure, fetchStructure } from "../routines";

class StructureLoader extends React.Component {
  static propTypes = {
    fetchStructure: PropTypes.func,
    clearStructure: PropTypes.func,
    match: PropTypes.object,
    structureLoading: PropTypes.bool,
    fetchDomains: PropTypes.func
  };

  componentDidMount() {
    const { fetchStructure, fetchDomains, match } = this.props;
    const { id } = match.params;
    if (id) {
      fetchStructure({ id });
      fetchDomains({ actions: "show" });
    }
  }

  componentWillUnmount() {
    const { clearStructure } = this.props;
    clearStructure();
  }

  render() {
    const { structureLoading } = this.props;

    if (structureLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators(
    { clearStructure, fetchStructure, fetchDomains },
    dispatch
  )
});

const mapStateToProps = ({ structureLoading }) => ({ structureLoading });

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(StructureLoader);

import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { clearStructureField, fetchStructureField } from "../routines";

class StructureFieldLoader extends React.Component {
  static propTypes = {
    fetchStructureField: PropTypes.func,
    clearStructureField: PropTypes.func,
    match: PropTypes.object,
    structureFieldLoading: PropTypes.bool
  };

  componentDidMount() {
    const { fetchStructureField, match } = this.props;
    const { id } = match.params;
    if (id) {
      fetchStructureField({ id });
    }
  }

  componentWillUnmount() {
    const { clearStructureField } = this.props;
    clearStructureField();
  }

  render() {
    const { structureFieldLoading } = this.props;

    if (structureFieldLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ clearStructureField, fetchStructureField }, dispatch)
});

const mapStateToProps = ({ structureFieldLoading }) => ({
  structureFieldLoading
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(StructureFieldLoader);

import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { clearEngines, fetchEngines } from "../routines";

export class EnginesLoader extends React.Component {
  static propTypes = {
    fetchEngines: PropTypes.func,
    clearEngines: PropTypes.func,
    enginesLoading: PropTypes.bool
  };

  componentDidMount() {
    const { fetchEngines } = this.props;
    fetchEngines({});
  }

  componentWillUnmount() {
    const { clearEngines } = this.props;
    clearEngines();
  }

  render() {
    const { enginesLoading } = this.props;

    if (enginesLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ clearEngines, fetchEngines }, dispatch)
});

const mapStateToProps = ({ enginesLoading }) => ({ enginesLoading });

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnginesLoader);

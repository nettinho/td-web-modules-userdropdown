import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import queryString from "query-string";
import { Loading } from "@truedat/core/components";
import { clearPaths, fetchPaths } from "../routines";

class PathsLoader extends React.Component {
  static propTypes = {
    clearPaths: PropTypes.func.isRequired,
    fetchPaths: PropTypes.func.isRequired,
    pathsLoading: PropTypes.bool.isRequired,
    location: PropTypes.object
  };

  componentDidMount() {
    const { location, fetchPaths, clearPaths } = this.props;
    const { uuids, titles, type_analysis } = queryString.parse(location.search);
    if (uuids || titles) {
      fetchPaths({ uuids, titles, type_analysis });
    } else {
      clearPaths();
    }
  }

  componentDidUpdate(prevProps) {
    const { location, fetchPaths, clearPaths } = this.props;
    if (location.search !== prevProps.location.search) {
      const { uuids, titles, type_analysis } = queryString.parse(
        location.search
      );
      if (uuids || titles) {
        fetchPaths({ uuids, titles, type_analysis });
      } else {
        clearPaths();
      }
    }
  }

  componentWillUnmount() {
    const { clearPaths } = this.props;
    clearPaths();
  }

  render() {
    const { pathsLoading } = this.props;
    return pathsLoading ? <Loading /> : null;
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ clearPaths, fetchPaths }, dispatch)
});

const mapStateToProps = ({ pathsLoading }) => ({ pathsLoading });

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(PathsLoader);

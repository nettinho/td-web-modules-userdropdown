import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { clearGroup, fetchGroup } from "../routines";

class GroupLoader extends React.Component {
  static propTypes = {
    fetchGroup: PropTypes.func.isRequired,
    clearGroup: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    groupLoading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { clearGroup, fetchGroup, match } = this.props;
    if (match) {
      const { id } = match.params;
      if (id) {
        fetchGroup({ id });
      } else {
        clearGroup();
      }
    }
  }

  componentDidUpdate(prevProps) {
    const { clearGroup, fetchGroup, match } = this.props;
    if (match) {
      const { id } = match.params;
      if (prevProps.match.params.id !== id) {
        if (id) {
          fetchGroup({ id });
        } else {
          clearGroup();
        }
      }
    }
  }

  componentWillUnmount() {
    const { clearGroup } = this.props;
    clearGroup();
  }

  render() {
    const { groupLoading } = this.props;
    return groupLoading ? <Loading /> : null;
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ clearGroup, fetchGroup }, dispatch)
});

const mapStateToProps = ({ groupLoading }) => ({ groupLoading });

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(GroupLoader);

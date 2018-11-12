import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { clearDomain, fetchDomain } from "../routines";

class DomainLoader extends React.Component {
  static propTypes = {
    fetchDomain: PropTypes.func,
    clearDomain: PropTypes.func,
    match: PropTypes.object,
    domainLoading: PropTypes.bool
  };

  componentDidMount() {
    const { clearDomain, fetchDomain, match } = this.props;
    const { id } = match.params;
    if (id) {
      fetchDomain({ id });
    } else {
      clearDomain();
    }
  }

  componentDidUpdate(prevProps) {
    const { clearDomain, fetchDomain, match } = this.props;
    const { id } = match.params;
    if (prevProps.match.params.id !== id) {
      if (id) {
        fetchDomain({ id });
      } else {
        clearDomain();
      }
    }
  }

  componentWillUnmount() {
    const { clearDomain } = this.props;
    clearDomain();
  }

  render() {
    const { domainLoading } = this.props;

    if (domainLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ clearDomain, fetchDomain }, dispatch)
});

const mapStateToProps = ({ domainLoading }) => ({ domainLoading });

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DomainLoader);

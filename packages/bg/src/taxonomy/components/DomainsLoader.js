import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { clearDomains, fetchDomains } from "../routines";

class DomainsLoader extends React.Component {
  static propTypes = {
    actions: PropTypes.string,
    clearDomains: PropTypes.func,
    fetchDomains: PropTypes.func,
    domainLoading: PropTypes.bool
  };

  componentDidMount() {
    const { fetchDomains, actions } = this.props;
    fetchDomains({ actions });
  }

  componentWillUnmount() {
    const { clearDomains } = this.props;
    clearDomains();
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

const mapStateToProps = ({ domainLoading }) => ({ domainLoading });
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ clearDomains, fetchDomains }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DomainsLoader);

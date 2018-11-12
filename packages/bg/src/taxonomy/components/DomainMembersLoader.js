import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { fetchDomainMembers } from "../routines";

class DomainMembersLoader extends React.Component {
  static propTypes = {
    fetchDomainMembers: PropTypes.func,
    match: PropTypes.object
  };

  componentDidMount() {
    const { fetchDomainMembers, match } = this.props;
    const { id } = match.params;
    if (id) {
      fetchDomainMembers({ id });
    }
  }

  componentDidUpdate(prevProps) {
    const { fetchDomainMembers, match } = this.props;
    const { id } = match.params;
    if (prevProps.match.params.id !== id) {
      if (id) {
        fetchDomainMembers({ id });
      }
    }
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchDomainMembers }, dispatch)
});

const mapStateToProps = ({ domainMembersLoading }) => ({
  domainMembersLoading
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(DomainMembersLoader);

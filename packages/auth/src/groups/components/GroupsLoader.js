import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Loading } from "@truedat/core/components";
import { fetchGroups } from "../routines";

class GroupsLoader extends React.Component {
  static propTypes = {
    fetchGroups: PropTypes.func,
    groupsLoading: PropTypes.bool
  };

  componentDidMount() {
    const { fetchGroups } = this.props;
    fetchGroups();
  }

  render() {
    const { groupsLoading } = this.props;
    if (groupsLoading) {
      return <Loading />;
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ groupsLoading }) => ({ groupsLoading });
const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ fetchGroups }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsLoader);
